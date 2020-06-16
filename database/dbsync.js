// const sequelize = require("./database");

const db = require('../database/database');
const directorOfStudiesService = require('../services/directorOfStudiesService');
const propertiesReader = require('../helpers/propertyReader');

addDefaultDos = async () => {
  const directorOfStudiesToCreate = {
    username: propertiesReader.getProperty('app.defaultUser'),
    password: propertiesReader.getProperty('app.defaultPassword'),
    is_admin: propertiesReader.getProperty('app.isAdmin'),
  };
  const directorOfStudiesIsAvaliable = await directorOfStudiesService.getByUsername(directorOfStudiesToCreate.username);
  if (!directorOfStudiesIsAvaliable) {
    await directorOfStudiesService.createDirectorOfStudies(null, directorOfStudiesToCreate);
  }
};

const exec = require('child_process').exec;
addTestData = async () => {
  if (propertiesReader.getProperty('app.forceSync') && propertiesReader.getProperty('app.enableTestData') !== false) {
    exec('node tests/createTestData.js', (error, stdout, stderr) => {
      if (error) {
        console.log('Error when adding test data');
        console.log(error);
      } else if (stderr) {
        console.log('Error when adding test data');
        console.log(stderr);
      } else {
        console.log('Test data has been added.');
      }
    });
  }
};

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
        await addDefaultDos();
        console.log('Database successfully synced');
        await addTestData();
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
