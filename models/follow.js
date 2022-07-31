module.exports = ( sequelize, type ) => {
    var Follow = sequelize.define('follow', {
      id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id : type.INTEGER,
      followed_id : type.INTEGER,
      created_at: type.DATE,
      updated_at: type.DATE,
    });
    return Follow;
}