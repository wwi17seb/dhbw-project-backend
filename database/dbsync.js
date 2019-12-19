const relations = require('./relations');

const sequelize = require("./database");

relations;

// verify that db is connected
sequelize
    .authenticate()
    .then(() => {
        sequelize
    // force: true -> drops database and add new relations
    .sync({
    	force: true
    })
    // .sync()
    .then(result => {
        console.log('Database successful synced');
        // console.log(result);
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
    