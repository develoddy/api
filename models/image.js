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

/**
 * 
 * Sirve para guardar las imágenes  y su información.
 * 
 * Explicación:
 * id: Llave primaria
 * src: Nombre del archivo de imagen
 * title: Titulo de la imagen
 * content: Descripción de la imagen
 * user_id: Id del usuario propietario de la imagen
 * level_id: quien puede ver la imagen
 * album_id: Si la imagen pertenece a un album, se guarda el id del album.
 * created_at: Fecha de creación
 * 
 */