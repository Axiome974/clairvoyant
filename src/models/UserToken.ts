import sequelize from "../utils/database";
import Sequelize, {Model} from "sequelize";
import User from "./User";

export interface IUserToken {
    token: string;
    expires: Date;
}

class UserToken extends Model implements IUserToken {
    public id!: number;
    public token!: string;
    public expires!: Date;
    public user_id!: number;
    public user?: User
}

UserToken.init({
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expires: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    {
        sequelize, // Passer l'instance Sequelize
        modelName: 'user_token' // Nom du modèle
    }
);

export default UserToken;