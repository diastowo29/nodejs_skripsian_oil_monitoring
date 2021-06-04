module.exports = (sequelize, type) => {
    return sequelize.define('pump-current', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        pump: type.BOOLEAN
    });
}