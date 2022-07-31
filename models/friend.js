module.exports = ( sequelize, type ) => {
    var Friend = sequelize.define('friend', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender_id : type.INTEGER,
        receptor_id : type.INTEGER,
        is_accepted: type.INTEGER,
        is_readed: {type: type.BOOLEAN, defaultValue: false,},
        created_at: type.DATE,
        updated_at: type.DATE,
    });
    return Friend;
}