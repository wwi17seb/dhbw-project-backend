'use strict';
const fs = require('fs'),
  path = require('path'),
  http = require('http');

const express = require('express');
const propertiesReader = require('./tools/propertyReader');
const app = express();
const serverPort = propertiesReader.getProperty('app.port');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const dbsync = require('./database/dbsync');

app.use(jsonParser);

// routes
const authRoutes = require('./routes/authRoutes');
const lecturerRoutes = require('./routes/lecturerRoutes');

app.use(authRoutes); // authroute: ./login ./logout ./signup
app.use(lecturerRoutes);
app.get("/", (req, res) => res.json({ status: 'server running' }));

dbsync
// Start the server without SSL
http.createServer(app).listen(serverPort, () => {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});