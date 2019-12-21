const db = require('../database/database');

module.exports.createDirectorOfStudies = async (user, lecturer) => {
    console.log('user:', user)
    console.log('lecturer:', lecturer)
    let transaction;
    try {
        transaction = await db.sequelize.transaction() // Managed Transaction

        const DirectorOfStudies = await db.DirectorOfStudies.create({
            User: user,
            Lecturer: lecturer

        }, {
            include: [{
                model: db.User
            }, {
                model: db.Lecturer
            }]
        }, transaction);

        await transaction.commit();

        return DirectorOfStudies;
    } catch (error) {
        console.log('createDirectorOfStudies', error);
        transaction.rollback();
    }
}

module.exports.findDirectorOfStudiesById = async (directorOfStudiesId) => {
    let transaction;
    try {
        transaction = await db.sequelize.transaction() // Managed Transaction

        const DirectorOfStudies = await db.DirectorOfStudies.findByPK({
            where: {
                id: directorOfStudiesId
            }
        }, transaction);

        await transaction.commit();

        return DirectorOfStudies;
    } catch (error) {
        console.log('findDirectorOfStudiesById', error);
        transaction.rollback();
    }
}