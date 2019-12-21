// const sequelize = require("./database");
const db = require('../database/database');
const userService = require('../services/user');
const propertiesReader = require('../tools/propertyReader');

// verify that db is connected
db.sequelize
    .authenticate()
    .then(() => {
        db.sequelize
            // force: true -> drops database and add new relations
            .sync({
                force: true
            })
            // .sync()
            .then(result => {
                const userToCreate = {
                    username: propertiesReader.getProperty('app.defaultUser'),
                    password: propertiesReader.getProperty('app.password')
                };
                userService.createUser(userToCreate);
                console.log('Database successful synced');
            })
            .catch(err => {
                console.log(err);
            });
        console.log("Database connected");
    })
    .catch(err => {
        console.log('Could not connect to DB');
        console.log("Error: " + err);
    });