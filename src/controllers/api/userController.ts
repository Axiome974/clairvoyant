import { User } from '../../models';
import bcrypt from "bcrypt";
import {userNotFound} from "../../exceptions/userException";
import {Request, Response} from "express";


const userController = {

    browse: async (req:Request, res:Response) => {
        const users = await User.findAll();
        res.json(users);
    },

    read: async (req:Request, res:Response) => {
        const {id} = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            throw userNotFound;
        }
        res.json(user);
    },

    add: async (req:Request, res:Response) => {
        const data = req.body;
        const user = await User.create({
            ...data,
            password: bcrypt.hashSync(data.password, 10)
        });
        res.json(user);
    },

    // delete, read, update
    delete: async (req:Request, res:Response) => {
        const {id} = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            throw userNotFound;
        }
        await user.destroy();
        res.json({message: "User deleted"});
    },

}


export default userController;