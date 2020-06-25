'use strict';
const fs = require('fs'),
  path = require('path'),
  http = require('http');

const express = require('express');
const propertiesReader = require('./helpers/propertyReader');
const app = express();
const serverPort = propertiesReader.getProperty('app.port');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({limit: '50mb'});

const dbsync = require('./database/dbsync');

app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(require('./helpers/logRequestHelper'));

// routes
app.use(require('./routes/authRoutes'));
app.use(require('./routes/coursesRoutes'));
app.use(require('./routes/semestersRoutes'));
app.use(require('./routes/mainFocusesRoutes'));
app.use(require('./routes/lecturersRoutes'));
app.use(require('./routes/fieldsOfStudyRoutes'));
app.use(require('./routes/majorSubjectsRoutes'));
app.use(require('./routes/presentationsRoutes'));
app.use(require('./routes/academicRecordsRoutes'));
app.use(require('./routes/modulecatalogRoutes'));
app.use(require('./routes/moduleGroupsRoutes'));
app.use(require('./routes/transferOwnershipRoutes'));

app.use(require('./tests/testRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Server Running', payload: null });
});
app.use(require('./routes/routeNotImplementedRoutes'));
const CONSOLE_LOG_COLOR_FG_RED = '\x1b[31m';
const CONSOLE_LOG_COLOR_RESET = '\x1b[0m';
app.use(function (err, req, res, next) {
  console.error(`${CONSOLE_LOG_COLOR_FG_RED}[ERROR]: ${err.message}${CONSOLE_LOG_COLOR_RESET}`);
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error', payload: null });
});

dbsync;
// Start the server without SSL
http.createServer(app).listen(serverPort, () => {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});
