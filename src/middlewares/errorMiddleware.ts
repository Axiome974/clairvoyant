import chalklogger from "../utils/chalklogger";
import ApiException from "../exceptions/ApiException";
import {Request, Response } from "express";

const errorMiddleware = (err:ApiException, req:Request, res:Response, next:Function) => {


    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    chalklogger.error(`⚠️ Error (${err.status}): ${err.message} `);

    res.status(status).json({message: message});
}

export default errorMiddleware;