import { User } from '../../models';
import bcrypt from "bcrypt";
import {userNotFound} from "../../exceptions/userException";
import {Request, Response} from "express";
import {PaginationQuery} from "../../middlewares/paginationQueryMiddleware";
import userService from "../../utils/security/userService";
import paginatorService from "../../services/paginatorService";


const userController = {

    browse: async (req:PaginationQuery, res:Response) => {
        res.json(await paginatorService.getPaginatedResults(User, req.pagination, {
            attributes:{
                exclude: ['password']
            },
        }));
    },

    read: async (req:Request, res:Response) => {
        const {id} = req.params;
        const user = await User.findByPk(id, {
            attributes:{
                exclude: ['password']
            }
        });
        if (!user) {
            throw userNotFound;
        }
        res.json(user);
    },

    add: async (req:Request, res:Response) => {
        const data = req.body;

        const user = await userService.createFromData({
            ...data,
            password: bcrypt.hashSync(data.password, 10)
        })
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