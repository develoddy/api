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

/**
 * 
 * Almacena información extendida sobre el perfil del usuario.
 * 
 * Explicación de los campos:
 * day_of_birth: Fecha de nacimiento
 * gender: Genero, hombre, mujer, otro, etc..
 * country_id: Id del pais desde la tabla “country”
 * image: Imagen de perfil
 * image_header: Imagen de cabecera
 * title: Titulo del perfil
 * bio: Descripción o biografia del perfil
 * likes: Cosas que te gustan
 * dislikes: Cosas que no te gustan
 * address: Dirección o domicilio
 * phone: Numero de telefono
 * public_email: Email publico
 * user_id: Id del usuario desde la tabla “user”
 * level_id: Quien puede ver tu perfil desde la tabla “level”
 * sentimental_id: Situación sentimental desde la tabla “sentimental”
 * 
 */