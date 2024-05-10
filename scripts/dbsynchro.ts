import syncDatabase from "../data/syncDatabase";
import loadFixtures from "../fixtures";
import sequelize from "../src/utils/database";

/**
 * This script updates the database schema based on the model definitions and load fixtures
 * @returns {Promise<void>}
 */
async function dbsynchro() {
    await syncDatabase();
    await loadFixtures();
    await sequelize.close();
}

dbsynchro();

