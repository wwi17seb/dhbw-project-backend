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
const errorResponseHelper = require('./helpers/errorResponseHelper');

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
app.use(require('./routes/directorOfStudiesRoutes'));
app.use(require('./routes/adminRoutes'));
app.use(require('./routes/googleCalendarRoutes'));

app.use(require('./tests/testRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Server Running', payload: null });
});
app.use(require('./routes/routeNotImplementedRoutes'));
app.use(function (err, req, res, next) {
  errorResponseHelper(res, next, err);
});

dbsync;
// Start the server without SSL
http.createServer(app).listen(serverPort, () => {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});
