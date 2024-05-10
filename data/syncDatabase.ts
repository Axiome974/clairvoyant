import sequelize from "../src/utils/database";
import "../src/models";
import chalklogger from "../src/utils/chalklogger";


/**
 * This script updates the database schema based on the model definitions
 */
const syncDatabase = async () => {
    try {
        await sequelize.sync({force: true});
        chalklogger.success("✔  Database synchronized");
    } catch (error) {
        chalklogger.error(`An error occured: ${error.message}`);
    }
}

export default syncDatabase;
