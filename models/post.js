
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

  /**
   * 
   * Sirve para guardar las publicaciones o cambios de estado del usuario, también eventos y publicaciones para amigos.
   * Descripción de los campos:
   * id: Identificador, llave primaria auto incremental
   * title: Titulo de la publicación
   * content: Contenido de la publicación
   * lat: Coordenada latitud para la ubicación
   * lng: Coordenada longitud para la ubicación
   * start_at: Fecha de inicio
   * finish_at: Fecha de fin
   * receptor_type_id: Donde se publica en el usuario, un rupo, una pagina, etc…
   * author_ref_id: El id del usuario que publica
   * receptor_ref_id: El id del usuario que recibe la publicación
   * level_id: Nivel de quien puede ver la publicación
   * post_type: Tipo de publicación puede ser estatus, evento, etc.
   * created_at: Fecha de creación
   * 
   */