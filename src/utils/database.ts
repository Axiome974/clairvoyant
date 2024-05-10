import {Sequelize} from 'sequelize';
import {DATABASE_URL} from "./envVariables";
import chalklogger from "./chalklogger";


if( !DATABASE_URL ) {
    chalklogger.error("DATABASE_URL is not defined");
}


const sequelize:Sequelize = new Sequelize(DATABASE_URL);

export default sequelize;

