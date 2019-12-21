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
        password,
        isAdmin
    } = user;
    try {
        transaction = await db.sequelize.transaction() // Managed Transaction
        const hashedPassword = await authService.hashPassword(password)
        const createdUser = await db.User.create({
            username: username,
            password: hashedPassword,
            is_admin: isAdmin
        }, transaction);

        await transaction.commit();

        return createdUser;

    } catch (error) {
        console.log('createUser', error);
        transation.rollback();
    }
}

module.exports.update = async user => {
    console.log('userToUpdate', user);
    let transaction;
    try {
        transaction = await db.sequelize.transaction();

        const updatedUser = await db.User.update({
            user
        }, {
            where: {
                id: user.id
            }
        });

        transaction = await transaction.commit();

        return updatedUser;
    } catch (error) {
        console.log('update user', error);
        transaction.rollback();
    }

}