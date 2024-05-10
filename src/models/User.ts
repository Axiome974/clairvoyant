import sequelize from "../utils/database";
import Sequelize, {Model} from "sequelize";

export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    password: string;
}


class User extends Model implements IUser{
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

export default User;