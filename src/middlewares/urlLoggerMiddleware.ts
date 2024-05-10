import {Request, Response } from "express";


const urlLoggerMiddleware = (req:Request, res:Response, next:Function) => {

    const { ip, method, url } = req;
    console.log( `✅ ${url} [${method}] FROM ${ip}` );
    next();

}

export default urlLoggerMiddleware;