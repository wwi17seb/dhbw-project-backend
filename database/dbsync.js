const fs = require("fs");
const db = require('../database/database');
const directorOfStudiesService = require('../services/directorOfStudiesService');
const propertiesReader = require('../helpers/propertyReader');
const { PDF_ROOT_PATH, PDF_SUBFOLDER_PATHS } = require('../services/pdfService');
const { initLocalKeysFile } = require('../helpers/localKeysFileHelper');

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
        console.log('Test data has been added');
      }
    });
  }
};

const initPdfFolder = async () => {
  if (!propertiesReader.getProperty('app.forceSync')) return;
  return new Promise((resolve) => {
    async function createSubfolders () {
      await Promise.all(PDF_SUBFOLDER_PATHS.map(subfolder => {
        return new Promise((resolve2, reject2) => {
          fs.mkdir(subfolder, { recursive: true }, (err) => {
            if (err) reject2(err);
            resolve2(true);
          })
        });
      }));
    }
    fs.rmdir(PDF_ROOT_PATH, { recursive: true }, async (err) => {
      if (err) console.log(err);
      await createSubfolders();
      resolve(true);
    });
  });
}

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
        await Promise.all([
          initPdfFolder(),
          initLocalKeysFile(propertiesReader.getProperty('app.forceSync')),
          addDefaultDos(),
        ]);
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
