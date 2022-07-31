
module.exports = ( sequelize, type ) => {
  var Post = sequelize.define('post', {
      id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: type.STRING,
      content: type.STRING,
      lat: type.DOUBLE,
      lng: type.DOUBLE,
      start_at: type.DATE,
      finish_at: type.DATE,
      receptor_type_id: type.INTEGER,
      author_ref_id: type.INTEGER,
      receptor_ref_id: type.INTEGER,
      level_id: type.INTEGER,
      post_type_id: type.INTEGER,
      created_at: type.DATE,
      updated_at: type.DATE,
    });
    return Post;
  }