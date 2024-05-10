import {Request, Response } from "express";

const mainController = {
    home : function (req:Request, res:Response){
        res.sendFile("../../public/index.html");
    }
}

export default mainController;