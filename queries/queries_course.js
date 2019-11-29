var propertiesReader = require('../tools/propertyReader');

const Pool = require('pg').Pool
const pool = new Pool({
    user: propertiesReader.getProperty('server.user'),
    host: propertiesReader.getProperty('server.host'),
    database: propertiesReader.getProperty('server.database'),
    password: propertiesReader.getProperty('server.password'),
    port: propertiesReader.getProperty('server.port'),
})

const getCourses = (request, response) => {
    try {
        pool.query('SELECT * FROM course', (error, results) => {
            if (error) {
                console.log('error getCourses', error);
                throw error;
            } else {
                response.status(200).json(results.rows);
            }
        })
    } catch (error) {
        console.log('error getCourses', error);
    }
}

const getCourseById = (request, response) => {
    try {
        const { id } = parseInt(request.params);

        pool.query('SELECT * FROM course WHERE id = $1', [id], (error, results) => {
            if (error) {
                console.log('error getCourseById', error);
                throw error;
            } else {
                response.status(200).json(results.rows);
            }
        })
    } catch (error) {
        console.log('error getCourseById', error);
    }
}

const createCourse = (request, response) => {
    const { id, name, tutor_id, quantityofstudents } = request.body;
    try {
        pool.query('INSERT INTO course (name, quantityofstudents, tutor_id) VALUES ($1, $2, $3)', [name, quantityofstudents, tutor_id], (error, results) => {
            if (error) {
                console.log('error createCourse', error);
                throw error;
            } else {
                response.status(201).send('New Course added');
            }
        })
    } catch (error) {
        console.log('error createCourse', error);
    }
}

const updateCourse = (request, response) => {
    const { id } = parseInt(request.params);
    const { name, tutor_id, quantityofstudents } = request.body;
    try {
        pool.query(
            'UPDATE course SET name = $1, quantityofstudents = $2, tutor_id = $3 WHERE id = $3', [name, quantityofstudents, tutor_id, id],
            (error, results) => {
                if (error) {
                    console.log('error updateCourse', error);
                    throw error;
                } else {
                    response.status(200).send('Course modified');
                }
            }
        )
    } catch (error) {
        console.log('error updateCourse', error);
    }
}

const deleteCourse = (request, response) => {
    const { id } = parseInt(request.params);
    try {
        pool.query('DELETE FROM course WHERE id = $1', [id], (error, results) => {
            if (error) {
                console.log('error deleteCourse', error);
                throw error;
            } else {
                response.status(200).send('Course deleted');
            }
        })
    } catch (error) {
        console.log('error deleteCourse', error);
    }
}

module.exports = {
    getCourses,
    getCourseById,
    deleteCourse,
    updateCourse,
    createCourse
}