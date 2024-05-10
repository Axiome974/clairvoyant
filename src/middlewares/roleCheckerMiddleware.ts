import { Response } from "express";
import {RequestWithUser} from "../types/RequestWithUser";

const roleCheckerMiddleware = function(role:string) {
    return function(req:RequestWithUser, res:Response, next:Function) {
        if( !req.user|| req.user.role !== role){
            return res.status(401).json({message: 'Unauthorized'});
        }
        next();
    }
}

export default roleCheckerMiddleware;