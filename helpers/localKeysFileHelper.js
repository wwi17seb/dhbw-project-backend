const fs = require('fs');

const PATH = 'keys.json';

const FILE_ENCODING = 'utf8';

module.exports.LOCAL_KEYS = {
  REGISTER_KEY: 'registerKey',
  GOOGLE_CALENDAR: 'googleCalendar',
};

let localKeys = {};
localKeys[this.LOCAL_KEYS.REGISTER_KEY] = '';
localKeys[this.LOCAL_KEYS.GOOGLE_CALENDAR] = { apiKey: '' };

module.exports.initLocalKeysFile = async (resetFile = false) => {
  if (resetFile) {
    await saveLocalKeysToFile(localKeys);
  } else {
    try {
      localKeys = await readLocalKeysFromFile();
    } catch {
      console.error(`Couldn't read ${PATH}, using default keys`);
    }
  }
};

module.exports.getLocalKey = (key) => {
  return localKeys[key];
};

module.exports.setLocalKey = (key, value) => {
  localKeys[key] = value;
  saveLocalKeysToFile();
};

async function saveLocalKeysToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile(PATH, JSON.stringify(localKeys), FILE_ENCODING, (err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
}

async function readLocalKeysFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(PATH, FILE_ENCODING, (err, data) => {
      if (err) reject(err);
      try {
        data = JSON.parse(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  });
}
