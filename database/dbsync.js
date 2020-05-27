// const sequelize = require("./database");

const db = require('../database/database');
const directorOfStudiesService = require('../services/directorOfStudiesService');
const accountService = require('../services/accountService');
const authService = require('../services/authService');
const propertiesReader = require('../helpers/propertyReader');

addDefaultUserAndDos = async () => {
  const hashedPassword = await authService.hashPassword(propertiesReader.getProperty('app.defaultPassword'));

  const userToCreate = {
    username: propertiesReader.getProperty('app.defaultUser'),
    password: hashedPassword,
    is_admin: propertiesReader.getProperty('app.isAdmin'),
  };
  const accountAvaliable = await accountService.getAccountByUsername(userToCreate.username);
  if (!accountAvaliable) {
    const lecturerToCreate = {};
    await directorOfStudiesService.createDirectorOfStudies(null, userToCreate, lecturerToCreate);
  }
};
/* addTestUser = async () => {
  const userToCreate = {
    username: propertiesReader.getProperty('app.testUser'),
    password: await authService.hashPassword(propertiesReader.getProperty('app.testPassword')),
    is_admin: false,
  };
  const userAvaliable = await userService.getUserByUsername(userToCreate.username);
  if (!userAvaliable) {
    const testUser = await userService.createUser(userToCreate);
  }
}; */

// verify that db is connected
db.sequelize
  .authenticate()
  .then(() => {
    db.sequelize
      // force: true -> drops database and add new relations
      .sync({
        force: propertiesReader.getProperty('app.forceSync'),
      })
      .then(async (result) => {
        await addDefaultUserAndDos();
        // await addTestUser();
        console.log('Database successful synced');
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Could not connect to DB');
    console.log('Error: ' + err);
  });
