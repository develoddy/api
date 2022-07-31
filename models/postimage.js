module.exports = ( sequelize, type ) => {
    var PostImage = sequelize.define('postimage', {
      post_id : type.INTEGER,
      image_id : type.INTEGER,
      created_at: type.DATE,
      updated_at: type.DATE,
    });
    return PostImage;
}

// module.exports = ( sequelize, type ) => {
//   var PostImage = sequelize.define('postimage', {

//     post_id : type.INTEGER,
//     image_id : type.INTEGER,
//     created_at: type.DATE,
//     updated_at: type.DATE,


//   }, {
//     classMethods: {
//       associate( models ) {
//         PostImage.hasMany(models.Image, {
//           foreignKey: {
//             name: 'image_id'
//           }
//         });
//       }
//     }
//   });
  
//   return PostImage;
// }