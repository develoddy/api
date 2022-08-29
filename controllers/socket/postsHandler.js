// - Importaciones

const { Post, User, Follow, PostImage, Image, Profile, Comment } = require("../../db");

// - Pagination

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


// - Funciones

module.exports =  ( io ) => {

    /**
     ----------------------------------------------------- 
     - GetPosts.
     - Se recupera las publicaciones de la base de datos.
     -----------------------------------------------------
     */
     const getPosts = async ( page, userId ) => { 

        //const socket = this // 
        
        
        try {
            var userId = userId;

            var localpage = 0;

            if ( page != 0 ) {
                  console.log("If--- Servidor: ");
                  console.log("page: " + page);
                  localpage = page;
            }

            var size = 2;

            console.log("If fuera--- Servidor: ");
            console.log("page: " + localpage);

            const { limit, offset } = getPagination(localpage, size);

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

            const response = getPagingData(posts, localpage, limit);

          
            io.emit("server:post_getpost", response);

        } catch (err) {
            console.log(err);
        }
    };



    /**
     ------------------------------------------------------------------------------------------------------- 
     - createComment.
     - Inserta un comentario en la base de datos.
     - Si el insertado es correcto, entonces se llama a la funcion de actualizar la lista de publicaciones. 
     ------------------------------------------------------------------------------------------------------- 
     */
    const createComment = async ( data, page, userId  ) => {
        try {
            const create = await Comment.create( data );
            if ( create ) {

                getPosts( page, userId );

            } else {
                console.log("Not Success");
            }
            
        } catch ( err ) {
           console.log(err);
        }
    };



     /**
     ------------------------------------------------------------------------------------------------------- 
     - deleteComment.
     - Borra un comentario en la base de datos.
     - Si el borrado es correcto, entonces se llama a la funcion de actualizar la lista de publicaciones. 
     ------------------------------------------------------------------------------------------------------- 
     */
    const deleteComment = async ( id, page, userId) => {
        try {
            const comment = await Comment.destroy({ where: { id: id } });
            if ( !comment ) {
                  console.log({ message: "No se ha borrado el commentario." });
            }
            getPosts( page, userId );
        } catch (error) {
            console.log({ message: "Error de borrado de comentarios..." });
        }
    };


    return {
        getPosts, 
        createComment,
        deleteComment
    }
}
