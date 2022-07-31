module.exports = ( sequelize, type ) => {
  var User = sequelize.define('user', {
    id:{
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name : type.STRING,
    lastname : type.STRING,
    username : type.STRING,
    email : type.STRING,
    password : type.STRING,
    code : type.STRING,
    is_active : {type: type.BOOLEAN, defaultValue: false,},
    is_admin : {type: type.BOOLEAN, defaultValue: false,},
    created_at: type.DATE,
    updated_at: type.DATE,
  });
  return User;
}