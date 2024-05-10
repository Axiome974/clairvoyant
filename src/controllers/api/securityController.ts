import jwtManager from "../../utils/security/jwtManager";
import userService from "../../utils/security/userService";
import {RequestWithUser} from "../../types/RequestWithUser";
import {Request, Response} from "express";
import {User, UserToken} from "../../models";
import {userAlreadyExist} from "../../exceptions/userException";
import passwordHasher from "../../services/passwordHasher";
import {badRefreshToken, tokenNotFound} from "../../exceptions/tokenException";
import chalklogger from "../../utils/chalklogger";

const securityController = {
    login :async function (req:Request, res:Response){

        const {email, password} = req.body;

        try{
            const foundUser = await userService.getUserForCredentials(email, password);
            const accessToken = await jwtManager.generateAccessToken(foundUser);
            const refreshToken = await jwtManager.generateRefreshToken(foundUser);
            res.json({accessToken, refreshToken});
        }catch (e){
            return res.status(401).json({message: e.message});
        }

    },

    refreshToken :async function (req:Request, res:Response){

        const { refreshToken } = req.body;
        const tokens = await jwtManager.verifyRefreshToken(refreshToken);

        if( !tokens ){
            throw badRefreshToken;
        }

        try{
            res.json(tokens);
        }catch (e){
            return res.status(401).json({message: e.message});
        }

    },

    revokeToken :async function (req:Request, res:Response){

        const { refreshToken } = req.body;

        const revoked = await UserToken.destroy({where: {token: refreshToken}});

        if( !revoked ){
            throw tokenNotFound;
        }

        res.json({message: "Token revoked"});
    },

    profile: async function(req:RequestWithUser, res:Response){
        return res.json(req.user);
    },

    register: async (req:Request, res:Response) => {

        const userExist = await User.findOne({where: {email: req.body.email}});
        if(  userExist ){
            throw userAlreadyExist;
        }

        const user = await userService.createFromData(req.body)
        res.json(user);
    }
}

export default securityController;