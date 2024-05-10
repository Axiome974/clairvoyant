import {User} from "../../models/index";
import bcrypt from "bcrypt";
import {IUser} from "../../models/User";
import {userAlreadyExist} from "../../exceptions/userException";

const userService = {

    SALT_ROUND: 10,

    getUserForCredentials: async (email:string, password:string) => {
        const foundUser = await User.findOne({where: {email}})
        if( !foundUser ){
            throw new Error('Invalid credentials');
        }
        const validate = bcrypt.compareSync(password, foundUser.password);
        if( !validate ){
            throw new Error('Invalid credentials');
        }
        return foundUser;
    },

    createFromData: async (data: IUser) => {
        const foundUser = await User.findOne({where: {email: data.email}});
        if( foundUser ){
            throw userAlreadyExist;
        }
        return await User.create({
            ...data,
            password: bcrypt.hashSync(data.password, userService.SALT_ROUND)
        });
    }



}

export default userService;