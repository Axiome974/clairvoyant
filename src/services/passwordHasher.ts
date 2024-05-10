import bcrypt from 'bcrypt';
import {IUser} from "../models/User";

const passwordHasher = {

    saltRound: 10,

    hashUserPassword: function( password:string ){
       return bcrypt.hashSync(password, this.saltRound);
    },

    checkUserPassword: function( user:IUser, password:string ){
        return bcrypt.compareSync(password, user.password);
    }
}

export default passwordHasher;