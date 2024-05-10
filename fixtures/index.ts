import chalklogger from "../src/utils/chalklogger";
import userSeeder from "./seeders/userSeeder";


async function loadFixtures() {

    // Create 10 users
    for( let i = 0; i < 10; i++) {
       await userSeeder.createAndSaveFakeUser();
    }

    await userSeeder.createUserFromObject({
        "firstname": "damien",
        "lastname": "carreno",
        "email": "admin@admin.fr",
        "password": "test1234"
    }, true);

    chalklogger.success("✔ Fixtures loaded");
}

export default loadFixtures;

