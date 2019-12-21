module.exports = (sequelize, DataTypes) => {
    const MajorSubject = sequelize.define("MajorSubject", {
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
        modelName: 'MajorSubject',
        tableName: 'major_subject'
    });

    MajorSubject.associate = function (models) {
        // todo
    };
    return MajorSubject;
}