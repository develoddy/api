module.exports = ( sequelize, type ) => {
     var Recover = sequelize.define('recover', {
      id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id : type.INTEGER,
      code : type.STRING,
      is_used : {type: type.BOOLEAN, defaultValue: false,},
      created_at: type.DATE,
      updated_at: type.DATE,
    });
    return Recover;
  }