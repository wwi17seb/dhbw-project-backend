module.exports = (sequelize, DataTypes) => {
    const Lecturer = sequelize.define("Lecturer", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        academic_title: {
            type: DataTypes.STRING,
        },
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        salutation: {
            type: DataTypes.STRING
        },
        phonenumber: {
            type: DataTypes.STRING
        },
        experience: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.STRING
        },
        is_extern: {
            type: DataTypes.BOOLEAN
        }
    }, {
        modelName: 'Lecturer',
        tableName: 'lecturer'
    });
    return Lecturer; 
}