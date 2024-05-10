
import jwtManager from "../utils/security/jwtManager";
import {User} from "../models";
import { Response } from "express";
import { RequestWithUser } from "../types/RequestWithUser";

const jwtAuthMiddleware = async (req:RequestWithUser, res:Response, next:Function) => {

    const tokenString = req.headers.authorization;
    if (!tokenString) {
        return res.status(401).json({message: "Unauthorized: jwt is missing from headers"});
    }

    if(!tokenString.startsWith("Bearer")){
        return res.status(401).json({message: "Unauthorized: bad token"});
    }

    const token = tokenString.split(" ")[1];
    try{
        const payload = jwtManager.verifyToken(token);
        const user = await User.findByPk(payload.user_id);
        if( !user ){
            return res.status(401).json({message: "Unauthorized: token has expired"});
        }

        req.user = user;

        next();
    }catch (e){
        return res.status(401).json({message: "Unauthorized: bad token"});
    }

}

export default jwtAuthMiddleware;