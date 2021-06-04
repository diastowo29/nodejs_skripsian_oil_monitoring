module.exports = (sequelize, type) => {
    return sequelize.define('oil-tank-current', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        oil: type.FLOAT
    });
}