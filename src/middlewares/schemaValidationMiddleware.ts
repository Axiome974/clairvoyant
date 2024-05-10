import ajvValidator from "../utils/ajvValidator";
import {Request, Response } from "express";
import AjvSchemaModel from "../types/ISchemaModel";

const schemaValidationMiddleware = (Model:AjvSchemaModel<any>) => {

    return (req:Request, res:Response, next:Function) => {
        const data = req.body;
        try{
            ajvValidator.validate(Model, data);
            next();
        }catch (e){
            res.status(400).json("Bad request body: " + e.message);
        }

    }

}

export default schemaValidationMiddleware;
