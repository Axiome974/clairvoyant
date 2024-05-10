import {Request, Response } from "express";
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { AjvSchema } from "../types/AjvSchema";
import paginatorService from "../services/paginatorService";
import {PaginationQuery} from "./paginationQueryMiddleware";
import {User} from "../models";
const ajv = new Ajv();
addFormats(ajv);


const schemaValidationMiddleware = (ajvSchema:AjvSchema) => {

    return (req:PaginationQuery, res:Response, next:Function) => {
        const data = req.body;


        const validate = ajv.compile(ajvSchema);
        const valid = validate(data);
        if (!valid) {
            return res.status(400).json("Bad request body: " + validate.errors[0].message);
        }

        next();
    }

}

export default schemaValidationMiddleware;
