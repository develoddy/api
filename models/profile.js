module.exports = ( sequelize, type ) => {
    var Profile = sequelize.define('profile', {
        id:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      day_of_birth : type.DATE,
      gender : type.STRING, 
      country_id: type.INTEGER,
      image: type.STRING,
      image_header : type.STRING,
      title : type.STRING,
      bio : type.STRING,
	  likes : type.STRING,
	  dislikes : type.STRING,
	  address : type.STRING,
	  phone : type.STRING,
	  public_email : type.STRING,
      user_id : type.INTEGER, 
	  level_id : type.INTEGER, 
	  sentimental_id : type.INTEGER,
      created_at: type.DATE,
      updated_at: type.DATE,
    });

    return Profile;
}