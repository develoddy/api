const { Post, User, Follow, PostImage, Image, Profile, Comment } = require("../../db");

module.exports =  (io) => {
    
      const create = async ( data ) => {
            const socket = this; 
            try {
                  const create = await Comment.create( data );

                  if ( create ) {
            
                        const comment = await Comment.findAll({
                            
                            include: [{
                                    model: User,
                                    attributes: ["id", "name", "username", "email"],
                                    include: [{
                                        model: Profile,
                                        attributes: ["bio", "image_header"]
                                    }]
                            }],
                            attributes: ["id", "userId", "commentId", "content"],
                      
                            where: { postId: data.postId },
                        });
                    
                        console.log("create:::: ");
                        console.log(comment);
                        io.emit("server:newcomment", comment);
                    } else {
                        console.log("Not Success");
                    }

                    
                  // --
            
            } catch ( err ) {
                  console.log(err);
            }
      };

      const read = async ( postId) => {  
            console.log("Server Idpost: " + postId);
            const socket = this; 
            try {
                  const comments = await Comment.findAll({
                        include: [{
                              model: User,
                              attributes: ["id", "name", "username", "email"],
                              include: [{
                                    model: Profile,
                                    attributes: ["bio", "image_header"]
                              }]
                        }],
                        attributes: ["id", "userId", "commentId", "content"],
                        where: { postId: postId }
                    });        
                  io.emit("server:comment_read", comments);
          
            } catch {
                  console.log("Error de lectura de comentarios...");
            }
      };

      //

      const update = async ( userId ) => {  
            try {
                  // --
                  // io.emit("server:message", response);

            } catch (err) {
                  console.log(err);
            }
      };


      const delet = async ( userId ) => {  
            try {
                  // --
                  // io.emit("server:message", response);

            } catch (err) {
                  console.log(err);
            }
      };

      
      return {
            create,
            read,
            update,
            delet
      }
  }