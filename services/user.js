const db = require('../database/database');

const authService = require('./auth');

module.exports.getUserByUsername = (username) => {
    return db.User.findOne({
        where: {
            username: username
        }
    });
}

module.exports.getUserById = (user_id) => {
    return db.User.findOne({
        where: {
            id: user_id
        }
    });
}

module.exports.createUser = async (user) => {
    let transaction;
    const {
        username,
        password
    } = user;
    try {
        transaction = await db.sequelize.transaction() // Managed Transaction
        const hashedPassword = await authService.hashPassword(password)
        const createdUser = await db.User.create({
            username: username,
            password: hashedPassword
        }, transaction);

        await transaction.commit();

        return createdUser;

    } catch (error) {
        console.log('createUser', error);
        transation.rollback();
    }
}