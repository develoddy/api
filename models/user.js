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

/**
 * 
 * La tabla user es la tabla principal del sistema, ya que cada usuario corresponde una cuenta y todos las las acciones 
 * se relacionan con el usuario desde publicar, comentar, hasta las notificaciones, etc..
 * 
 * La tabla user cuenta con los siguientes campos:
 * id: es la llave primaria auto incremental de la tabla (La mayoría de las tablas incluyen su ID para ser relacionadas con otras tablas)
 * name: Nombre real del usuario
 * lastname: Apellidos del usuario
 * username: Nombre de usuario para inciar sesión
 * email: Correo para iniciar sesión y para recibir notificaciones
 * password: Contraseña
 * code: Código de recuperación
 * is_active: Si el usuario esta activo
 * is_admin: Si el usuario es administrador
 * created_at: Fecha de creación automática por el sistema
 * 
 */