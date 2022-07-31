module.exports = ( sequelize, type ) => {
    var Conversation = sequelize.define('conversation', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender_id : type.INTEGER,
        receptor_id : type.INTEGER,
        created_at: type.DATE,
        updated_at: type.DATE,
    });
    return Conversation;
}