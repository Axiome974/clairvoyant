import {faker} from "@faker-js/faker";
import passwordHasher from "../../src/services/passwordHasher";
import {ROLE_ADMIN} from "../../src/enums/roleEnum";
import userService from "../../src/utils/security/userService";

interface UserData{
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    role?:string
}

/**
 * This module is used to create fake users and save them to the database
 */
const userSeeder = {

    /**
     * Create a fake user
     */
    getFakeUser: function ():UserData{
        return {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email(),
            password: passwordHasher.hashUserPassword( faker.internet.password() ),
        }
    },

    /**
     * Create a user from an object
     * @param userData
     * @param isAdmin
     */
    createUserFromObject: async function (userData:UserData, isAdmin:boolean=false){
        if(isAdmin){
            userData.role = ROLE_ADMIN;
        }
        return await userService.createFromData(userData);
    },

    /**
     * Create and save a fake user
     */
    createAndSaveFakeUser: async function (){
        await userService.createFromData(this.getFakeUser());
    }

}


export default userSeeder;