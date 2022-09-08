module.exports = ( sequelize, type ) => {
    var Heart = sequelize.define('heart', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_id : type.INTEGER,
        ref_id : type.INTEGER,
        user_id: type.INTEGER,
        created_at: type.DATE,
        updated_at: type.DATE,
    });
    return Heart;
}