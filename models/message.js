module.exports = ( sequelize, type ) => {
    var Message = sequelize.define('message', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content : type.STRING,
        user_id : type.INTEGER,
        conversation_id : type.INTEGER,
        created_at: type.DATE,
        updated_at: type.DATE,
        is_read: type.TINYINT
    });
    return Message;
}