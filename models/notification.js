module.exports = ( sequelize, type ) => {
    var Notification = sequelize.define('notification', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        not_type_id : type.INTEGER,
        type_id : type.INTEGER,
        ref_id : type.INTEGER,
        receptor_id: type.INTEGER,
        sender_id: type.INTEGER,
        is_readed: {type: type.BOOLEAN, defaultValue: false,},
        created_at: type.DATE,
        updated_at: type.DATE,
    });
    return Notification;
}