
import syncDatabase from "../data/syncDatabase";
import sequelize from "../src/utils/database";

/**
 * This script updates the database schema based on the model definitions and load fixtures
 * @returns {Promise<void>}
 */
async function schemaUpdate() {
    await syncDatabase();
    await sequelize.close();
}

schemaUpdate();

