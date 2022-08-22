const { Post, User, Follow, PostImage, Image, Profile, Comment } = require("../../db");
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: posts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, posts, totalPages, currentPage, limit };
};


module.exports =  (io) => {
    /**
     - 
     - @param {*} data 
     */
    const createComment = async ( data ) => {
        const socket = this; 
        //io.emit('server:message', `${socket.id.substr(0, 2)} said ${data}`);
    };
    
    /**
     * 
     * @param {*} orderId 
     * @param {*} callback 
     */
    
    //const readComment = function (orderId, callback) {
    const readComment = async ( page, userId ) => {  

        /*const users = await User.findAll();
        io.emit("server:message", users);*/
     
    

        try {
            console.log("id page: " + page)
            console.log("userId: " + userId);
            var userId = userId;

            var page = 0;

            if ( page ) {
                  page = page;
            }

            var size = 2;

            const { limit, offset } = getPagination(page, size);

            const follow = await Follow.findAll({
                  include: [
                        {
                              model: User,
                              attributes: ["id", "name"],
                        },
                  ],
                  where: { user_id: userId },
            });

            if ( !follow ) {
                  res.json("No hay follows.");
            }

            var follows_clean = [];

            follow.forEach(( element ) => {
                  follows_clean.push(element.followed_id);
            });

            follows_clean.push(userId);

            const posts = await Post.findAndCountAll({
                  include: [{
                        model: User,
                        attributes: ["id", "name", "username", "email"],
                        include: [{
                              model: Profile,
                              attributes: ["bio", "image_header"]
                        }]
                  }, {
                        model: Image,
                        attributes: ["title", "src"],
                  },{
                        model: Comment,
                        include: [{
                              model: User,
                              attributes: ["id", "name", "username", "email"],
                              include: [{
                                    model: Profile,
                                    attributes: ["bio", "image_header"]
                              }]
                        }],
                        attributes: ["id", "userId", "commentId", "content"],
                        
                  }],
                  attributes: ["id", "content", "created_at"],
                  where: { userId: follows_clean },
                  order: [["id", "DESC"]],
                  limit,
                  offset,
            });

            const response = getPagingData(posts, page, limit);

            //res.json(response);
            io.emit("server:message", response);

      } catch (err) {
            console.log(err);
            /*return res
                  .status(500)
                  .send({
                        message: "Backeden Post: Error al devolver posts...",
                  });*/
      }


    };
    

    return {
        createComment,
        readComment
    }
  }