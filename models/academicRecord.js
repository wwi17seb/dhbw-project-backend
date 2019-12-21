module.exports = (sequelize, DataTypes) => {
    const AcademicRecord = sequelize.define("AcademicRecord", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        abbreviation: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING, 
        },
        rated: {
            type: DataTypes.BOOLEAN
        }
    }, {
        modelName: 'AcademicRecord',
        tableName: 'academic_record'
    });

    AcademicRecord.associate = function (models) {
        // todo
    };
    return AcademicRecord;
}