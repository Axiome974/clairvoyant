import jwt from 'jsonwebtoken';
import {JWT_EXPIRES_IN, REFRESH_EXPIRES_IN, REFRESH_TOKEN_SECRET, SECRET_KEY} from "../envVariables";
import User from "../../models/User";
import {UserToken} from "../../models";



const jwtManager = {

    // Create a JWT token
    generateAccessToken: (user:User) => {
        return jwt.sign({
            user_id: user.id,
        }, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
    },


    verifyToken: (token:string) => {
        return jwt.verify(token, SECRET_KEY);
    },

    generateRefreshToken: async (user:User) => {

        const oldRefreshToken = await UserToken.findOne({where: {user_id: user.id}});

        if( oldRefreshToken ){
           await oldRefreshToken.destroy();
        }

        const refreshToken = jwt.sign({
            user_id: user.id,
        }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_EXPIRES_IN });


        await UserToken.create({
            user_id: user.id,
            token: refreshToken,
            expires: new Date(Date.now() + REFRESH_EXPIRES_IN * 1000)
        });

        return refreshToken;
    },

    verifyRefreshToken: async (token:string) => {

        const refreshToken = await UserToken.findOne({
            where: { token: token },
            include: ["user"]
        });

        const isValid = refreshToken && jwt.verify(refreshToken.token, REFRESH_TOKEN_SECRET);

        // If there is a token in database and the token is valid
        if( isValid ){
            return {
                accessToken: jwtManager.generateAccessToken(refreshToken.user),
                refreshToken: await jwtManager.generateRefreshToken(refreshToken.user)
            }
        }

        return null;

    },

    revokeRefreshToken: async (token:string) => {

        const refreshToken = await UserToken.findOne({
            where: { token: token },
        });

        if( refreshToken ){
            await refreshToken.destroy();
            return true;
        }

        return false;
    },



}

export default jwtManager;