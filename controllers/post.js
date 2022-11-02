//import { Sequelize } from "sequelize";
const Sequelize = require('sequelize');
const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const { Post, User, Follow, PostImage, Image, Profile, Comment, Heart } = require("../db");
const { Op } = require("sequelize");

const getPagination = (page, size) => {
      const limit = size ? +size : 0;
      const offset = page ? page * limit : 0;
      return { limit, offset };
};

const getPagingData = (data, page, limit) => {
      const { count: totalItems, rows: posts } = data;
      const currentPage = page ? +page : 0;
      const totalPages = Math.ceil(totalItems / limit);
      return { totalItems, posts, totalPages, currentPage, limit };
};

/**
 * CREATE NEW POST
 * @param {req.body} req
 * @param {*} res
 * @returns
 */
exports.create = async (req, res) => {
      try {
            var params = req.body;

            if (!params.content) {
                  return res
                        .status(200)
                        .send({ message: "deves enviar un texto" });
            }

            const post = await Post.create({
                  title: req.body.title,
                  content: req.body.content,
                  lat: req.body.lat,
                  lng: req.body.lng,
                  start_at: req.body.start_at,
                  finish_at: req.body.finish_at,
                  receptor_type_id: req.body.receptor_type_id,
                  author_ref_id: req.body.author_ref_id,
                  receptor_ref_id: req.body.receptor_ref_id,
                  level_id: req.body.level_id,
                  post_type_id: req.body.post_type_id,
                  created_at: req.body.created_at,
                  updated_at: req.body.updated_at,
                  userId: req.body.userId
            });

            if (!post) {
                  res.json("No se pudo crear el post");
            }

            res.json(post);
      } catch (err) {
            console.log(err);
            return res.status(500).send({ message: "Error create post" });
      }
};


/*
 * CREATE LIKE. 
 */
exports.createLike = async (req, res) => {
      try {
            var params = req.body;
            const create = await Heart.create(params)
            if ( create ) {
                  res.json(create);
            } 
      } catch ( err ) {
            console.log(err);
            res.json({ message: "Error create Like." });
      }
};


/*
 * DELETE LIKE. 
 */
exports.deleteLike = async ( req, res ) => {
    try {

      const like = await Heart.destroy({ 
            where: { id: req.params.id, 
                     ref_id: req.params.postId } 
      });
      if ( like === 0 ) {
            // No existe el id o hay un error al intentar borrar el commentario!
            return res.status(404).send({ message: false });
      }
      // Se ha borrado el commentario con Exito!
      return res.status(200).send({ message: true });
    } catch (error) {
        res.json("Error de borrado de comentarios...");
        return res.status( 500 ).send({ message: "Error de borrado de comentarios..." });
    }
};


exports.checkIfLikesExist = async ( req, res ) => {

      try {
            const heart = await Heart.findAll({
                  where: {ref_id: req.params.postId, user_id: req.params.userId}
            });

            res.json(heart)
            /*if ( heart.length == 0 ) {
                  res.json({message: false})
            }
            res.json({message:true})*/
            
      } catch ( err ){
            console.log(err);
            res.json({ message: "Error checkIfLikesExist Like." });
      }
};



/*
 * ---------------- PUBLICACIONES ----------------
 * Function: posts
 * Description: Este metodo me va a devolver todas las publicaciones 
 * de los usuarios que yo sigo por pagina.
 *
 */
exports.posts = async (req, res) => {
      try {
            var userId = req.userId;

            var page = 0;

            if ( req.params.page ) {
                  page = req.params.page;
            }

            var size = 2;

            

            const follow = await Follow.findAll({
                  include: [{
                        model: User,
                        attributes: ["id", "name"],
                  }],
                  where: { user_id: userId },
            });

            if ( !follow ) {
                  res.json("No hay follows.");
            }

            // Follows
            var follows_clean = [];

            follow.forEach(( element ) => {
                  follows_clean.push(element.followed_id);
            });

            follows_clean.push(req.userId);

            const { limit, offset } = getPagination(page, size);
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
                        attributes: ["id", "userId", "commentId", "content" ],
                        //offset: 0,
                        //limit : 2,
                        
                  },{
                        model: Heart,
                        attributes: ["id", "ref_id", "user_id"],
                        include: [{
                              model: User,
                              attributes: ["id", "name", "username", "email"],
                        }]
                  }],
                  attributes: ["id", "content", "created_at"],
                  where: { userId: follows_clean },
                  //order: [["id", "DESC"]],
                  limit,
                  offset,
            });
            
            const response = getPagingData(posts, page, limit);
            
            
            // Obtener id de cada publicación.
            var posts_ids = [];

            response.posts.forEach(( element ) => {
                  posts_ids.push(element.id);
            });

            // Contar cuantos comentarios tiene cada publicación
            const comment_count = await Comment.findAll({
                  attributes: [ 'postId', [Sequelize.fn('COUNT', 'id'), 'comentarios'] ],
                  group: ['postId']
            });
            

            res.json({ResPostImages:response, commentCounts: comment_count });

      } catch (err) {
            console.log(err);
            return res
                  .status(500)
                  .send({
                        message: "Backeden Post: Error al devolver posts...",
                  });
      }
};


/**
 * postsUser
 * @desc  Muestra el post en acorde al id que se le pasa por la url.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.postsUser = async (req, res) => {
      try {
            var userId = req.userId;

            if (req.params.user_id) {
                  userId = req.params.user_id;
            }

            var page = 0;

            if (req.params.page) {
                  page = req.params.page;
            }

            var size = 5;

            const { limit, offset } = getPagination(page, size);


            const post = await Post.findAndCountAll({
                  include: [{
                        model: User,
                        attributes: ["id", "username"],
                        include: [{
                              model: Profile,
                              attributes: ["bio", "image_header"]
                        }]
                  }, {
                        model: Image,
                        attributes: ["id", "title", "content", "marginLeft", "link"],
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
                        attributes: ["id", "userId", "commentId", "content" ],
                        offset: 0,
                        limit : 2,
                        
                  },{
                        model: Heart,
                        attributes: ["id", "ref_id", "user_id"],
                        include: [{
                              model: User,
                              attributes: ["id", "name", "username", "email"],
                        }]
                  }],
                  attributes: ["id", "content"],
                  where: { userId: userId },
                  order: [["id", "DESC"]],
                  limit,
                  offset,
            });

            const response = getPagingData(post, page, limit);

            // Obtener id de cada publicación.
            var posts_ids = [];

            response.posts.forEach(( element ) => {
                  posts_ids.push(element.id);
            });

            // Contar cuantos comentarios tiene cada publicación
            const comment_count = await Comment.findAll({
                  attributes: [ 'postId', [Sequelize.fn('COUNT', 'id'), 'comentarios'] ],
                  group: ['postId']
            });
            

            res.json({ResPostImages:response, commentCounts: comment_count });
            //res.json(response);

      } catch (err) {
            console.log(err);
            return res
                  .status(500)
                  .send({
                        message: "Backeden Post: Error al devolver posts...",
                  });
      }
};



/**
 * postsImagesUser
 * @desc Muestra todo los post con sus respectivas imagenes.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.postsImagesUser = async (req, res) => {
      try {
            
            var userId = req.userId;

            var page = 0;

            if ( req.params.page ) {
                  page = req.params.page;
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
                  attributes: ["user_id", "followed_id"],
                  where: { user_id: userId },
            });

            if ( !follow ) {
                  res.json("No hay follows.");
            }

            var follows_clean = [];

            follow.forEach(( element ) => {
                  follows_clean.push(element.followed_id);
            });
            
            follows_clean.push(req.userId);
            
            const posts = await Post.findAndCountAll({
                  include: [{
                        model: User,
                        attributes: ["id", "username"],
                        include: [{
                              model: Profile,
                              attributes: ["bio", "image_header"]
                        }]
                  }, {
                        model: Image,
                        attributes: ["title"],
                  }],
                  attributes: ["id", "content"],
                  where: { userId: follows_clean },
                  order: [["id", "DESC"]],
                  limit,
                  offset,
            });

            const response = getPagingData(posts, page, limit);

            res.json(response);

            
      } catch (err) {
            console.log(err);
            return res
                  .status(500)
                  .send({
                        message: "Backeden Post: Error al devolver posts...",
                  });
      }
}

/**
 * FIND ONE POST BY ID
 * @desc Muestra un solor post.
 * @param {req.params.id} req
 * @param {*} res
 * @returns
 */
exports.post = async (req, res) => {
      try {
            const post = await Post.findOne({
                  include: [{
                        model: User,
                        attributes: ["id", "username"],
                        include: [{
                              model: Profile,
                              attributes: ["bio", "image_header"]
                        }]
                  }, {
                        model: Image,
                        attributes: ["id", "title", "content", "marginLeft", "link"],
                  }],
                  attributes: ["id", "content"],
                  where: { id: req.params.id },
            });
            if (!post) {
                  return res
                        .status(404)
                        .send({ message: "No existe la publicación" });
            }
            return res.status(200).send({ post });
      } catch (err) {
            return res
                  .status(500)
                  .send({ message: "Error al devolver la publiación" });
      }
};




/**
 * postsUser
 * @desc  Paginado de post en el modal profile
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 exports.postPaginate = async (req, res) => {
      try {
            var userId = req.userId;

            if (req.params.user_id) {
                  userId = req.params.user_id;
            }

            var page = 0;

            if (req.params.page) {
                  page = req.params.page;
            }

            var size = 1;

            const { limit, offset } = getPagination(page, size);

            const post = await Post.findAndCountAll({
                  include: [{
                        model: User,
                        attributes: ["id", "username"],
                        include: [{
                              model: Profile,
                              attributes: ["bio", "image_header"]
                        }]
                  }, {
                        model: Image,
                        attributes: ["id", "title", "content", "marginLeft", "link"],
                  }],
                  attributes: ["id", "content"],
                  where: { id: req.params.id_post },
                  limit,
                  offset,
            });
            if (!post) {
                  return res
                        .status(404)
                        .send({ message: "No existe la publicación" });
            }

            const response = getPagingData(post, page, limit);

            res.json(response);

      } catch (err) {
            console.log(err);
            return res
                  .status(500)
                  .send({
                        message: "Backeden Post: Error al devolver posts...",
                  });
      }
};

/**
 * DELETE POST BY ID
 * @param {req.params.id} req
 * @param {*} res
 * @returns
 */
exports.delete = async (req, res) => {
      try {
            const post = await Post.destroy({ where: { id: req.params.id } });
            if (!post) {
                  //return res.status(404).send({ message: "No se ha borrado la publicación" });
                  return res.status(404).send({ message: false });
            }
            //return res.status(200).send({ message: "Se ha borrado el post" });
            return res.status(200).send({ message: true });
      } catch (err) {
            return res
                  .status(500)
                  .send({ message: "Error al borrar la publiación" });
      }
};



/*
 * ------ ACTUALIZAR CONTENIDO DE PUBLICACIÓN --------
 * EN ESTA FUNCION SE ACTUALIZAR EL CONTENIDO DE LA PUBLICACIÓN.
 * EN BASE AL ID DEL PUBLICACIÓN.
 */
exports.update = async ( req, res ) => {
      try {
            const update = await Post.update(
                  { content: req.body.content}, 
                  { where: { id: req.body.postId }}
            );
            // DEVUELVE 1 SI EL UPDATE FUE MODIFICADO EL TEXTO.
            // DEVUELVE 0 SI EL UPDATE NO TIENE MODIFICACION EN EL TEXTO.

            if ( update === 0 ) {
                  // No existe el id o hay un error al intentar borrar el commentario!
                  return res.status(404).send({ message: false });
            }
            // Se ha borrado el commentario con Exito!
            return res.status(200).send({ message: true });
      } catch ( err ) {
          console.log(err)
          res.json("Error update comment.")
      }
  };



/**
 * UPLOAD FILE IMAGE ON POST
 * @param {params.postId} req
 * @param {*} res
 * @returns
 */
exports.upload = async (req, res) => {
      try {
            var postId = +req.params.postId;

            console.log("req.userId : "  + req.userId );
            console.log("postId: " + req.params.postId);

            // Ver si existe el post y que el usuario conectado es autor del post.
            const post = await Post.findOne({
                  where: { 
                        id: postId, 
                        userId: req.userId 
                  },
            });

            if ( !post ) {
                  return res.status(404).send({ message: "No tienes permisos para actualizar la publicación" });
            }

            if ( req.files == undefined ) {
                  return res.send("You must select a file");
            }

            var image;
            var postimage;
            for ( const key in req.files ) {
                  fs.renameSync(
                          req.files[key].path, req.files[key].path + "." + req.files[key].mimetype.split("/")[1]
                  );

                  image = await Image.create({
                        src: req.files[key].path + "." +req.files[key].mimetype.split("/")[1],
                        title: req.files[key].path.split("/")[2] + "." + req.files[key].mimetype.split("/")[1],
                        content: null,
                        user_id: req.userId,
                        level_id: 1,
                        album_id: 1,
                        created_at: null,
                        updated_at: null,
                  });

                  if ( !image ) {
                        return res.status(404).send({ message: "No insert image" });
                  } else {
                        image.addPosts([post])
                  }
            }
      
            const images = await Post.findAll({
                  include: [{
                              model: Image,
                              attributes: ["src"],
                        }],
                  attributes: ["id", "content"],
                  where: { id: postId }
            });

            return res.status(200).send(images);

      } catch ( err ) {
            console.log(err);
            res.json("Error upload image in server");
      }
}


/**
 * getImageFile
 * @param {*} req 
 * @param {*} res 
 */
 exports.getImageFile = async (req, res) => {
      var image_file = req.params.imageFile;
      var path_file = "public/posts/" + image_file;

      const valid = fs.existsSync(path_file);
      if ( valid ) {
            res.sendFile(path.resolve(path_file));
      } else {
            res.status(400).send({
                  message: "No existe la imagen...",
            });
      }
};
