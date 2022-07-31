module.exports = ( sequelize, type ) => {
    var Image = sequelize.define('image', {
        id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      src : type.STRING,
      title : type.STRING, 
      content: type.STRING,
      user_id: type.INTEGER,
      level_id: type.INTEGER,
      album_id: type.INTEGER,
      created_at: type.DATE,
      updated_at: type.DATE,
      marginLeft: type.INTEGER,
      link : type.STRING,
    });

    return Image;
}
