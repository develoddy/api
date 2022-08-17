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

/**
 * 
 * Sirve para crear albums de imagenes.
 * 
 * Explicación:
 * id: Llave primaria
 * title: Titulo del album
 * content: Descripción del album
 * user_id: Id del usuario propietario del album
 * level_id: Nivel de permiso o distribución del album
 * created_at: Fecha de creación
 * 
 */