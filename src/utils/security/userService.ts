import {User} from "../../models/index";
import bcrypt from "bcrypt";

const userService = {

    SALT_ROUND: 10,

    getUserForCredentials: async (email:string, password:string) => {
        const foundUser = await User.findOne({
            where: {
                email
            }
        })

        if( !foundUser ){
            throw new Error('Invalid credentials');
        }

        const validate = bcrypt.compareSync(password, foundUser.password);
        if( !validate ){
            throw new Error('Invalid credentials');
        }

        return foundUser;
    },

    createFromData: async (data: any) => {
        return await User.create({
            ...data,
            password: bcrypt.hashSync(data.password, userService.SALT_ROUND)
        });
    }



}

export default userService;