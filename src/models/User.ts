import sequelize from "../utils/database";
import Sequelize from "sequelize";
import AjvSchemaModel from "../types/ISchemaModel";

export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    password: string;
}


class User extends AjvSchemaModel<IUser> implements IUser{
    public id!: number;
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public role!: string;
    public password!: string;
}

User.init({
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'ROLE_USER'
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize, // Passer l'instance Sequelize
        modelName: 'user' // Nom du modèle
    }
);
//-- Schema validation
User.prototype.ajvSchema = {
    type: 'object',
    properties: {
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string', format: 'email' }
    },
    required: ['firstname', 'lastname', 'email', 'password'],
    additionalProperties: false
};

export default User;