/* Main objective of this script is to fill the database with data, but it can
 * also be used to test whether everything works fine. It uses the API instead
 * of invoking controllers/services. It's recommended to clear the database
 * before.
 */
const nodeFetch = require('node-fetch');
const propertiesReader = require('./helpers/propertyReader');

const SERVER_URL = 'http://localhost:3000';

let TOKEN = null;
const showLog = process.argv.slice(3).includes('log');

function get(path, data, token) {
  return _fetch('GET', path, data, token);
}
function post(path, data, token) {
  return _fetch('POST', path, data, token);
}
function put(path, data, token) {
  return _fetch('PUT', path, data, token);
}
function del(path, data, token) {
  return _fetch('DELETE', path, data, token);
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
  log(method, url);
  return nodeFetch(url, options)
    .then((response) => response.json())
    .then((json) => json.payload);
}

function log(...args) {
  if (showLog) {
    console.log(...args);
  }
}

function promiseHelper(method) {
  return new Promise(async (resolve, reject) => {
    await method();
    resolve();
  });
}

async function login() {
  const defaultUsername = propertiesReader.getProperty('app.defaultUser');
  const defaultPassword = propertiesReader.getProperty('app.defaultPassword');
  try {
    TOKEN = (await post('login', { username: defaultUsername, password: defaultPassword })).token;
  } catch (error) {
    console.log(error);
  }
}

async function createUser(username, password = 'pw') {
  return post('signup', { username, password });
}

async function createUsers() {
  const usernamesToCreate = ['jreichwald', 'ritterbusch', 'matt', 'gömert'];
  if (data.users === undefined) data.users = {};
  const promises = [];
  for (const username of usernamesToCreate) {
    promises.push(
      promiseHelper(async () => {
        data.users[username] = await createUser(username);
      })
    );
  }
  await Promise.all(promises);
}

async function createFieldOfStudiesAndMajorSubjects() {
  await Promise.all([
    createFieldOfStudyWirtschaftsinformatik(),
    createFieldOfStudyBWL(),
    createFieldOfStudyDigitaleMedien(),
  ]);
}

async function createFieldOfStudyWirtschaftsinformatik() {
  data.fosWI = await post('fieldOfStudies', { name: 'Wirtschaftsinformatik' });
  const fieldOfStudy_id = data.fosWI.fieldOfStudy_id;
  await Promise.all([
    promiseHelper(async () => {
      data.msWISE11 = await post('majorSubjects', {
        fieldOfStudy_id,
        name: 'Software Engineering ab 2011',
      });
    }),
    promiseHelper(async () => {
      data.msWISE18 = await post('majorSubjects', {
        fieldOfStudy_id,
        name: 'Software Engineering ab 2018',
      });
    }),
    promiseHelper(async () => {
      data.msWIDS = await post('majorSubjects', {
        fieldOfStudy_id,
        name: 'Data Science ab 2018',
      });
    }),
    promiseHelper(async () => {
      data.msWISC = await post('majorSubjects', {
        fieldOfStudy_id,
        name: 'Sales & Consulting',
      });
    }),
  ]);
}

async function createFieldOfStudyBWL() {
  data.fosBWL = await post('fieldOfStudies', { name: 'BWL' });
  const fieldOfStudy_id = data.fosBWL.fieldOfStudy_id;
  await Promise.all([
    promiseHelper(async () => {
      data.msBWLIN = await post('majorSubjects', {
        fieldOfStudy_id,
        name: 'Industrie ab 2018',
      });
    }),
    promiseHelper(async () => {
      data.msBWLDBM = await post('majorSubjects', {
        fieldOfStudy_id,
        name: 'Digital Business Management ab 2018',
      });
    }),
  ]);
}

async function createFieldOfStudyDigitaleMedien() {
  data.fosDM = await post('fieldOfStudies', { name: 'Digitale Medien' });
  data.msDM = await post('majorSubjects', {
    fieldOfStudy_id: data.fosDM.fieldOfStudy_id,
    name: '- ab 2018',
  });
}

async function createCourses() {
  await Promise.all([
    promiseHelper(async () => {
      data.courseWI17SEB = await post(
        'courses',
        {
          name: 'WWI 17 SE B',
          google_calendar_id: '[GOOGLE_KALENDER_ID]',
          majorSubject_id: data.msWISE11,
          directorOfStudy_ids: [data.users['ritterbusch'].directorOfStudy_id],
          semesters: [
            {
              name: 'WS 17/18',
              number: 1,
              start_date: '2017-10-23',
              end_date: '2018-01-19',
            },
            {
              name: 'SS 18',
              number: 2,
              start_date: '2018-05-14',
              end_date: '2018-08-03',
            },
            {
              name: 'WS 18/19',
              number: 3,
              start_date: '2018-11-19',
              end_date: '2019-02-05',
            },
            {
              name: 'SS 19',
              number: 4,
              start_date: '2019-05-06',
              end_date: '2019-08-02',
            },
            {
              name: 'WS 19/20',
              number: 5,
              start_date: '2019-11-18',
              end_date: '2020-02-14',
            },
            {
              name: 'WS 20',
              number: 6,
              start_date: '2020-05-11',
              end_date: '2020-07-31',
            },
          ],
        },
        data.users['jreichwald'].token
      );
    }),
    promiseHelper(async () => {
      data.courseWI17SEB = await post(
        'courses',
        {
          name: 'WWI 18 SE B',
          google_calendar_id: '[GOOGLE_KALENDER_ID]',
          majorSubject_id: data.msWISE18,
          directorOfStudy_ids: [],
          semesters: [
            {
              name: 'WS 18/19',
              number: 1,
              start_date: '2018-11-19',
              end_date: '2019-02-05',
            },
            {
              name: 'SS 19',
              number: 2,
              start_date: '2019-05-06',
              end_date: '2019-08-02',
            },
            {
              name: 'WS 19/20',
              number: 3,
              start_date: '2019-11-18',
              end_date: '2020-02-14',
            },
            {
              name: 'WS 20',
              number: 4,
              start_date: '2020-05-11',
              end_date: '2020-07-31',
            },
            {
              name: 'WS 20/21',
              number: 5,
              start_date: '2020-10-23',
              end_date: '2021-01-19',
            },
            {
              name: 'SS 21',
              number: 6,
              start_date: '2021-05-14',
              end_date: '2021-08-03',
            },
          ],
        },
        data.users['ritterbusch'].token
      );
    }),
  ]);
}

const data = {};
async function main() {
  await login();
  await Promise.all([createUsers(), createFieldOfStudiesAndMajorSubjects()]);
  await createCourses();

  console.log(data.users);
}

main();
