module.exports = ( sequelize, type ) => {
    var Comment = sequelize.define('comment', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_id : type.INTEGER,
        ref_id : type.INTEGER,
        user_id: type.INTEGER,
        content : type.STRING,
        comment_id : type.INTEGER,
        created_at: type.DATE,
        updated_at: type.DATE,
        postId: type.INTEGER
    });
    return Comment;
}


/**
 * 
 * Explicación:
 * id: Llave primaria
 * type_id: Tipo, si es para posts, imágenes, albums etc.
 * ref_id: El id del del post, imagen o album según el caso.
 * user_id: El id del usuario que crea el comentario
 * content: Contenido del comentario
 * comment_id: Si es un comentario de otro comentario, se guarda el id del comentario superior
 * created_at: Fecha de creación
 * 
 */