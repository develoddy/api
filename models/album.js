module.exports = ( sequelize, type ) => {
    var Album = sequelize.define('album', {
        id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title : type.STRING,
      content : type.STRING, 
      user_id: type.INTEGER,
      level_id: type.INTEGER,
      created_at: type.DATE,
      updated_at: type.DATE,
    });

    return Album;
}