const express = require('express');
const bodyParser = require('body-parser');
const db_tutor = require('./queries/queries_tutor');
const db_course = require('./queries/queries_course');
var propertiesReader = require('./tools/propertyReader');

const app = express();
const port = propertiesReader.getProperty('app.port');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// basic URI
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express and Postgres API' });
});

// URI for tutor
app.get('/tutor', db_tutor.getTutors);
app.get('/tutor/:id', db_tutor.getTutorById);
app.post('/tutor', db_tutor.createTutor);
app.put('/tutor/:id', db_tutor.updateTutor);
app.delete('/tutor/:id', db_tutor.deleteTutor);

// URI for course
app.get('/course', db_course.getCourses);
app.get('/course/:id', db_course.getCourseById);
app.post('/course', db_course.createCourse);
app.put('/course/:id', db_course.updateCourse);
app.delete('/course/:id', db_course.deleteCourse);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});