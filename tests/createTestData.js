/* Main objective of this script is to fill the database with data, but it can
 * also be used to test whether everything works fine (only creating data). It
 * uses the API instead of invoking controllers/services. It is recommended to
 * clear the database before executing this script (otherwise you'll have some
 * records multiple times). When you already have records in the database that
 * need to be unique, you will probably receive an error.
 *
 * You can start this script with 'node tests/createTestData.js'. Some options
 * are offered to see the result. You can use 'log' or 'l' to write everything
 * to a log file. You can use 'verbose' or 'v' to print everything to console.
 * This includes details of the request (http method + url + request body) and
 * the response you receive from the server.
 * A command could look like this: 'node tests/createTestData.js v l'. You can
 * also add 'node tests/createTestData.js' to the scripts part of package.json
 * so that you can then use it as npm run command, e.g. 'npm run testdata'.
 */
const nodeFetch = require('node-fetch');
const fs = require('fs');
const propertiesReader = require('../helpers/propertyReader');

const testdata = require('./testdata');
const { create } = require('domain');

let SERVER_URL = `http://localhost:${propertiesReader.getProperty('app.port')}`;
const SERVER_URL_PRODUCTION = `https://localhost/api`;

let TOKEN = null;
const LOG_DIR = './logs';
const commandLineParameters = process.argv.slice(2);
const verbose = commandLineParameters.includes('v') || commandLineParameters.includes('verbose');
const saveLog = commandLineParameters.includes('l') || commandLineParameters.includes('log');

if (saveLog && !fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

function _fetch(method, path, data, token) {
  const url =
    SERVER_URL +
    (!path.startsWith('/') ? '/' : '') +
    path +
    (path.includes('?') ? '&' : '?') +
    `token=${token || TOKEN}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (data) options.body = JSON.stringify(data);
  let status;
  return nodeFetch(url, options)
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then((json) => {
      log(status, method, url, 'body:', data, 'response:', json);
      return json.payload;
    });
}

function log(status, ...args) {
  const isError = ![200, 201].includes(status);
  if (verbose || isError) {
    console.log(...args);
  }
  if (saveLog) {
    let logContent = '';
    args.forEach((element) => {
      logContent += ' ' + JSON.stringify(element);
    });
    fs.appendFileSync(`${LOG_DIR}/createTestData.log`, `${`[${new Date().toISOString()}]`}${logContent}` + '\n');
  }
}

function promiseHelper(method) {
  return new Promise(async (resolve) => {
    await method();
    resolve();
  });
}

async function setServerURLIfProduction() {
  try {
    await _fetch('GET', '/');
  } catch (error) {
    // server not working, probably because deployed as frontend; disable tls check because of self-signed certificate
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    SERVER_URL = SERVER_URL_PRODUCTION;
  }
}

async function login() {
  const defaultUsername = propertiesReader.getProperty('app.defaultUser');
  const defaultPassword = propertiesReader.getProperty('app.defaultPassword');
  try {
    TOKEN = (await _fetch('POST', 'login', { username: defaultUsername, password: defaultPassword })).token;
  } catch (error) {
    console.log(error);
  }
}

async function createTestData(filename) {
  const method = testdata[filename].method || 'POST';
  const route = testdata[filename].route;
  const name = testdata[filename].name || route;
  if (!data[name]) {
    data[name] = {};
  }

  await Promise.all(
    testdata[filename].data.map((entry) => {
      return promiseHelper(async () => {
        const dataObject = replacePlaceholders(entry.data);
        const tokenObject = replacePlaceholders(entry.token);
        try {
          const response = await _fetch(method, route, dataObject, tokenObject);
          if (!response) {
            throw new Error('No data received');
          }
          data[name][entry.id] = response;
        } catch {
          if (testdata[filename].alternativeRoute) {
            data[name][entry.id] = await _fetch(method, testdata[filename].alternativeRoute, dataObject, tokenObject);
          }
        }
      });
    })
  );
}

function replacePlaceholders(obj) {
  function isPlaceholder(obj) {
    return typeof obj === 'string' && obj.startsWith('{{') && obj.endsWith('}}');
  }
  function _replace(str) {
    try {
      let cur = data;
      for (let part of str
        .substring(2, str.length - 2)
        .trim()
        .split('.')) {
        cur = cur[part.split('[')[0]];
        const ixBracket = part.indexOf('[');
        if (ixBracket !== -1) {
          const ids = part.substring(ixBracket + 1, part.length - 1).split('][');
          for (const id of ids) {
            cur = cur[Number(id)];
          }
        }
      }
      return cur;
    } catch {
      return undefined;
    }
  }
  if (isPlaceholder(obj)) {
    return _replace(obj);
  }
  for (const key in obj) {
    if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
      replacePlaceholders(obj[key]);
    } else if (isPlaceholder(obj[key])) {
      obj[key] = _replace(obj[key]);
    }
  }
  return obj;
}

const data = {};
async function main() {
  await setServerURLIfProduction();
  await login();
  await createTestData('activateRegisterKey');
  await Promise.all([
    createTestData('fieldsOfStudy'),
    createTestData('users'),
    createTestData('academicRecords'),
    createTestData('mainFocuses'),
  ]);
  createTestData('deactivateRegisterKey');
  await Promise.all([createTestData('majorSubjects')]);
  await Promise.all([
    createTestData('courses'),
    createTestData('moduleGroupsModulesLectures'),
    createTestData('lecturers'),
  ]);
  await Promise.all([createTestData('presentations')]);
  await Promise.all([createTestData('googleCalendar')]);
}

main();
