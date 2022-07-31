module.exports = ( sequelize, type ) => {
    var Country = sequelize.define('country', {
      id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name : type.STRING,
      preffix : type.STRING,
      created_at: type.DATE,
      updated_at: type.DATE,
    });
    return Country;
}