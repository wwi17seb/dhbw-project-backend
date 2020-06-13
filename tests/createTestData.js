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

const SERVER_URL = 'http://localhost:3000';

let TOKEN = null;
const LOG_DIR = './logs';
const commandLineParameters = process.argv.slice(2);
const verbose = commandLineParameters.includes('v') || commandLineParameters.includes('verbose');
const saveLog = commandLineParameters.includes('l') || commandLineParameters.includes('log');

if (saveLog && !fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

function post(path, data, token) {
  return _fetch('POST', path, data, token);
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
  return nodeFetch(url, options)
    .then((response) => response.json())
    .then((json) => {
      log(method, url, 'body:', data, 'response:', json);
      return json.payload;
    });
}

function log(...args) {
  if (verbose) {
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

async function createAcademicRecords() {
  await Promise.all([
    promiseHelper(async () => {
      data.arK = await post('academicRecords', {
        abbreviation: 'K',
        type: 'Klausur',
        rated: true,
      });
    }),
    promiseHelper(async () => {
      data.arSE = await post('academicRecords', {
        abbreviation: 'SE',
        type: 'Seminararbeit',
        rated: true,
      });
    }),
    promiseHelper(async () => {
      data.arLNfalse = await post('academicRecords', {
        abbreviation: 'LN',
        type: '???',
        rated: false,
      });
    }),
  ]);
}

async function createMainFocuses() {
  await Promise.all([
    promiseHelper(async () => {
      data.mfSoftwareEntwicklung = await post('mainFocuses', {
        name: 'Software-Entwicklung',
      });
    }),
    promiseHelper(async () => {
      data.mfITSicherheit = await post('mainFocuses', {
        name: 'IT-Sicherheit',
      });
    }),
    promiseHelper(async () => {
      data.mfWebentwicklung = await post('mainFocuses', {
        name: 'Webentwicklung',
      });
    }),
    promiseHelper(async () => {
      data.mfDatenbank = await post('mainFocuses', {
        name: 'Datenbank',
      });
    }),
    promiseHelper(async () => {
      data.mfMLAIDS = await post('mainFocuses', {
        name: 'Machine Learning / AI / Data Science',
      });
    }),
    promiseHelper(async () => {
      data.mfProjektmanagement = await post('mainFocuses', {
        name: 'Peojektmanagement',
      });
    }),
    promiseHelper(async () => {
      data.mfBWL = await post('mainFocuses', {
        name: 'BWL',
      });
    }),
    promiseHelper(async () => {
      data.mfRecht = await post('mainFocuses', {
        name: 'Recht',
      });
    }),
  ]);
}

function getMainFocusIds(mainFocusKeys) {
  const mainFocusIds = [];
  for (let key of mainFocusKeys) {
    if (!(key in data) && !key.startsWith('mf')) {
      key = 'mf' + key;
    }
    if (key in data) {
      mainFocusIds.push(data[key].mainFocus_id);
    }
  }
  return mainFocusIds;
}

async function createFieldsOfStudyAndMajorSubjects() {
  await Promise.all([
    createFieldOfStudyWirtschaftsinformatik(),
    createFieldOfStudyBWL(),
    createFieldOfStudyDigitaleMedien(),
  ]);
}

async function createFieldOfStudyWirtschaftsinformatik() {
  data.fosWI = await post('fieldsOfStudy', { name: 'Wirtschaftsinformatik' });
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
  data.fosBWL = await post('fieldsOfStudy', { name: 'BWL' });
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
  data.fosDM = await post('fieldsOfStudy', { name: 'Digitale Medien' });
  data.msDM = await post('majorSubjects', {
    fieldOfStudy_id: data.fosDM.fieldOfStudy_id,
    name: '- ab 2018',
  });
}

async function createCourses() {
  await Promise.all([
    promiseHelper(async () => {
      data.courseWWI17SEB = await post(
        'courses',
        {
          name: 'WWI 17 SE B',
          google_calendar_id: '[GOOGLE_KALENDER_ID]',
          majorSubject_id: data.msWISE11.majorSubject_id,
          directorOfStudies_ids: [data.users['ritterbusch'].directorOfStudies_id],
          Semesters: [
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
      data.courseWWI18SEB = await post(
        'courses',
        {
          name: 'WWI 18 SE B',
          google_calendar_id: '[GOOGLE_KALENDER_ID]',
          majorSubject_id: data.msWISE18.majorSubject_id,
          directorOfStudies_ids: [],
          Semesters: [
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

async function createModuleGroupsModulesAndLectures() {
  await Promise.all([
    promiseHelper(async () => {
      data.mgRechnungslegung = await post('moduleGroups', {
        majorSubject_id: data.msWISE11.majorSubject_id,
        name: 'Grundlagen der Rechnungslegung',
        number_of_modules_to_attend: 2,
        from_semester_number: 1,
        to_semester_number: 2,
        Modules: [
          {
            name: 'Grundlagen der Rechnungslegung',
            description: '',
            ects: 6,
            catalog_id: 'WWISE_101',
            academicRecord_ids: [data.arK.academicRecord_id],
            number_of_lectures_to_attend: 2,
            requirements: 'Keine',
            Lectures: [
              {
                name: 'Finanzbuchhaltung',
                workload_home: '36h',
                workload_dhbw: '54h',
                catalog_id: 'WWISE_101.1',
                mainFocus_ids: getMainFocusIds(['BWL']),
              },
              {
                name: 'Kosten- und Leistungsrechnung',
                workload_home: '36h',
                workload_dhbw: '54h',
                catalog_id: 'WWISE_101.2',
                mainFocus_ids: getMainFocusIds(['BWL']),
              },
            ],
          },
        ],
      });
    }),
  ]);
}

async function createLecturers() {
  await Promise.all([
    promiseHelper(async () => {
      data.lecturerTM = await post(
        'lecturers',
        {
          firstname: 'Tony',
          lastname: 'Maldonary',
          academic_title: 'BSC.',
          email: 'Tony.Maldonary@bachelor-of-science.com',
          salutation: 'Herr',
          phonenumber: '0123456789',
          experience: 'Can handle DB lecture',
          mainFocus_ids: getMainFocusIds(['Projektmanagement', 'Webentwicklung', 'Recht']),
          profile: 'My Profile',
          research: 'My Research',
          cv: 'My CV',
          comment: 'sehr engagiert',
          is_extern: false,
        },
        data.users['gömert'].token
      );
    }),
    promiseHelper(async () => {
      data.lecturerEB = await post(
        'lecturers',
        {
          firstname: 'Emmett L.',
          lastname: 'Brown',
          academic_title: 'Dr.',
          email: 'emmett.l@brown.edu',
          salutation: 'Mr.',
          phonenumber: '+1 1210 1985 2204',
          experience: 'time travel, DeLorean, plutionium',
          mainFocus_ids: getMainFocusIds(['Projektmanagement', 'SoftwareEntwicklung']),
          profile: '-',
          research: 'lots of stuff',
          cv: '-',
          comment:
            'can not hold lectures in the afternoon because he walks his dog from 3 to 5 pm; does not hesitate to cooperate with criminals',
          is_extern: true,
        },
        data.users['jreichwald'].token
      );
    }),
    promiseHelper(async () => {
      data.lecturerQQ = await post(
        'lecturers',
        {
          firstname: 'Quirinus',
          lastname: 'Quirrell',
          academic_title: '',
          email: 'quirrell@hogwarts.co.uk',
          salutation: 'Mr.',
          phonenumber: '+44 578 2108',
          experience: 'Defence Against the Dark Arts',
          mainFocus_ids: getMainFocusIds([]),
          profile: '-',
          research: '',
          cv: '-',
          comment: 'Ravenclaw, hpmor.com',
          is_extern: true,
        },
        data.users['jreichwald'].token
      );
    }),
    promiseHelper(async () => {
      data.lecturerEA = await post(
        'lecturers',
        {
          firstname: 'Elliot',
          lastname: 'Alderson',
          academic_title: null,
          email: 'elliotalderson@protonmail.ch',
          salutation: 'Herr',
          phonenumber: '(212) 555-0179',
          experience: 'Cybersecurity, Linux',
          mainFocus_ids: getMainFocusIds(['ITSicherheit', 'MLAIDS']),
          profile: null,
          research: null,
          cv: 'Cybersecurity Engineer at Allsafe Cybersecurity',
          comment: 'paranoid',
          is_extern: true,
        },
        data.users['jreichwald'].token
      );
    }),
  ]);
}

async function createPresentations() {
  await Promise.all([
    promiseHelper(async () => {
      data.presentation1 = await post(
        'presentations',
        {
          status: 'In Progress',
          lecturer_id: data.lecturerQQ.lecturer_id,
          lecture_id: data.mgRechnungslegung.Modules[0].Lectures[0].lecture_id,
          course_id: data.courseWWI17SEB.course_id,
          academicRecord_id: data.arK.academicRecord_id,
          semester_id: data.courseWWI17SEB.Semesters[0].semester_id,
        },
        data.users['jreichwald'].token
      );
    }),
    promiseHelper(async () => {
      data.presentation2 = await post(
        'presentations',
        {
          status: 'In Progress',
          lecturer_id: data.lecturerEA.lecturer_id,
          lecture_id: data.mgRechnungslegung.Modules[0].Lectures[0].lecture_id,
          course_id: data.courseWWI17SEB.course_id,
          academicRecord_id: data.arSE.academicRecord_id,
          semester_id: data.courseWWI17SEB.Semesters[0].semester_id,
        },
        data.users['jreichwald'].token
      );
    }),
    promiseHelper(async () => {
      data.presentation3 = await post(
        'presentations',
        {
          status: 'In Progress',
          lecturer_id: data.lecturerEB.lecturer_id,
          lecture_id: data.mgRechnungslegung.Modules[0].Lectures[1].lecture_id,
          course_id: data.courseWWI18SEB.course_id,
          academicRecord_id: data.arSE.academicRecord_id,
          semester_id: data.courseWWI17SEB.Semesters[0].semester_id,
        },
        data.users['ritterbusch'].token
      );
    }),
  ]);
}

const data = {};
async function main() {
  await login();
  await Promise.all([
    createUsers(),
    createAcademicRecords(),
    createMainFocuses(),
    createFieldsOfStudyAndMajorSubjects(),
  ]);
  await Promise.all([createCourses(), createModuleGroupsModulesAndLectures(), createLecturers()]),
    await createPresentations();

  console.log(data.users);
}

main();
