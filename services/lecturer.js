const db = require('../database/database');

const directorOfStudiesService = require('./directorOfStudies');

module.exports.findLecturerById = async (lecturerId) => {
    let transaction;
    try {
        transaction = await db.sequelize.transaction() // Managed Transaction

        const Lecturer = await db.Lecturer.findByPK({
            where: {
                id: lecturerId
            }
        }, transaction);

        await transaction.commit();

        return Lecturer;
    } catch (error) {
        console.log('findLecturerById', error);
        transaction.rollback();
    }
}

module.exports.createLecturer = async (lecturer, directorOfStudiesId) => {
    let transaction;
    try {
        transaction = await db.sequelize.transaction() // Managed Transaction

        DirectorOfStudies = await directorOfStudiesService.findDirectorOfStudiesById(directorOfStudiesId);

        const Lecturer = await db.Lecturer.create({
            ...lecturer,
            DirectorOfStudies: DirectorOfStudies
        }, {
            include: [{
                model: db.DirectorOfStudies
            }]
        }, transaction);

        await transaction.commit();

        return Lecturer;
    } catch (error) {
        console.log('createLecturer', error);
        transaction.rollback();
    }
}

const db = require('../database/database');

const directorOfStudiesService = require('./directorOfStudies');

module.exports.findLecturerById = async (lecturerId) => {
    let transaction;
    try {
        transaction = await db.sequelize.transaction() // Managed Transaction

        const Lecturer = await db.Lecturer.findByPK({
            where: {
                id: lecturerId
            }
        }, transaction);

        await transaction.commit();

        return Lecturer;
    } catch (error) {
        console.log('findLecturerById', error);
        transaction.rollback();
    }
}

// TODO
module.exports.findByDirectorOfStudiesId = async (directorOfStudiesId) => {
    let transaction;
    try {
        transaction = await db.sequelize.transaction() // Managed Transaction

        const Lecturers = await db.Lecturer.findByPK({
            where: {
                directorOfStudies_id: directorOfStudiesId
            }
        }, transaction);

        await transaction.commit();

        return Lecturers;
    } catch (error) {
        console.log('findByDirectorOfStudiesId', error);
        transaction.rollback();
    }
}