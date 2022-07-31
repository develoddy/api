module.exports = ( sequelize, type ) => {
    var Team = sequelize.define('team', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image : type.STRING,
        title : type.STRING,
        description : type.STRING,
        user_id: type.INTEGER,
        status: type.INTEGER,
        created_at: type.DATE,
        updated_at: type.DATE,
    });
    return Team;
}