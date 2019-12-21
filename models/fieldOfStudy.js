module.exports = (sequelize, DataTypes) => {
    const FieldOfStudy = sequelize.define("FieldOfStudy", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        }
    }, {
        modelName: 'FieldOfStudy',
        tableName: 'field_of_study'
    });

    FieldOfStudy.associate = function (models) {
        // todo
    };
    return FieldOfStudy;
}