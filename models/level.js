module.exports = ( sequelize, type ) => {
   var Level = sequelize.define('level', {
    id:{
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name : type.STRING,
    created_at: type.DATE,
    updated_at: type.DATE,
  });
  return Level;
}