const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'becker',
    password: '123456',
    port: 5432,
})

const getTutors = (request, response) => {
    try {
        pool.query('SELECT * FROM tutor', (error, results) => {
            if (error) {
                throw error
                console.log('error getTutors', error);
            } else {
                response.status(200).json(results.rows)
            }
        })
    } catch (error) {
        console.log('error getTutors', error);
    }
}

const getCourses = (request, response) => {
    try {
        pool.query('SELECT * FROM course', (error, results) => {
            if (error) {
                throw error
                console.log('error getCourses', error);
            } else {
                response.status(200).json(results.rows)
            }
        })
    } catch (error) {
        console.log('error getCourses', error);
    }
}

const getTutorById = (request, response) => {
    try {
        const { id } = parseInt(request.params)
        pool.query('SELECT * FROM tutor WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error
                console.log('error getTutorById', error);
            } else {
                response.status(200).json(results.rows)
            }
        })
    } catch (error) {
        console.log('error getTutorById', error);
    }
}

const createTutor = (request, response) => {
    // todo address and contactinformation
    try {
        const { id, firstname, lastname, dateofbirth, title, email, address, contactinformation } = request.body
        pool.query('INSERT INTO tutor (firstname, lastname, dateofbirth, title) VALUES ($1, $2, $3, $4)', [firstname, lastname, dateofbirth, title], (error, results) => {
            if (error) {
                throw error
                console.log('error createTutor', error);
            } else {
                response.status(201).send(`Tutor added`)
            }
        })
    } catch (error) {
        console.log('error createTutor', error);
    }
}

const updateTutor = (request, response) => {
    try {
        const { id } = parseInt(request.params)
        const { firstname, lastname, dateofbirth, title, address, contactinformation } = request.body
        pool.query(
            'UPDATE tutor SET firstname = $1, lastname = $2,dateofbirth = $3,title = $4WHERE id = $6', [firstname, lastname, dateofbirth, title, id],
            (error, results) => {
                if (error) {
                    throw error
                    console.log('error updateTutor', error);
                } else {
                    response.status(200).send(`Tutor modified`)
                }
            }
        )
    } catch (error) {
        console.log('error updateTutor', error);
    }
}

const deleteTutor = (request, response) => {
    const { id } = parseInt(request.params)
    try {
        pool.query('DELETE FROM tutor WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error
            } else {
                response.status(200).send(`Tutor deleted`)
            }
        })
    } catch (error) {
        console.log('error deleteTutor', error);
    }
}

module.exports = {
    getTutorById,
    getTutors,
    createTutor,
    updateTutor,
    deleteTutor,
}