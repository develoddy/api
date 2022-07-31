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
    });
    return Comment;
}