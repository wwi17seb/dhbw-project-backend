'use strict';
const fs = require('fs'),
  path = require('path'),
  http = require('http'),
  https = require('https');

const propertiesReader = require('./tools/propertyReader');
const app = require('connect')();
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const serverPort = propertiesReader.getProperty('app.port');

const dbsync = require('./database/dbsync');

// const privateKey = fs.readFileSync('./server.key');
// const certificate = fs.readFileSync('./server.crt');

// routes
const authRoutes = require('./routes/authRoute');



// swaggerRouter configuration
const options = {
  swaggerUi: path.join(__dirname, './swagger.json'),
  controllers: path.join(__dirname, './api/controllers'),
  // useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname, 'api/swagger/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);
const swaggerUiOptions = {
  apiDocs: '/api-docs' + swaggerDoc.basePath,
  swaggerUi: '/docs' + swaggerDoc.basePath
};

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  // that's the default option to open swagger documentation
  // on e.g. http://localhost:3000/doc
  // app.use(middleware.swaggerUi());

  // use defined options edited in line 27-28
  app.use(middleware.swaggerUi(swaggerUiOptions));

  // authroute
  // ./login ./logout ./signup
  app.use(authRoutes);

  dbsync
  // // Start the server without SSL
  http.createServer(app).listen(serverPort, () => {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});