//import { Sequelize } from "sequelize";
const Sequelize = require('sequelize');
const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const { Post, User, Follow, PostImage, Image, Profile, Comment } = require("../db");
const { Op } = require("sequelize");

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

/**
 * FIND PAGINATION POST
 * @desc Este metodo me va a devolver todas las publicaciones de los usuarios que yo sigo por pagina.
 * @param {req.userId} req
 * @param {*} res
 */
exports.posts = async (req, res) => {
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

            var size = 4;

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
                  where: { userId: userId },
                  order: [["id", "DESC"]],
                  limit,
                  offset,
            });

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

      /*try {
            var userId = req.userId;

            if (req.params.user_id) {
                  userId = req.params.user_id;
            }

            if (req.params.page) {
                  page = req.params.page;
            }

            var page = 0;

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
                  where: { id: req.params.id_post , userId: userId },
                  order: [["id", "DESC"]],
                  limit,
                  offset,
            });

            const response = getPagingData(post, page, limit);

            res.json(response);

      } catch (err) {
            console.log(err);
            return res
                  .status(500)
                  .send({
                        message: "Backeden Post: Error al devolver posts...",
                  });
      }*/





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
                  return res
                        .status(404)
                        .send({ message: "No se ha borrado la publicación" });
            }
            return res.status(200).send({ message: "Se ha borrado el post" });
      } catch (err) {
            return res
                  .status(500)
                  .send({ message: "Error al borrar la publiación" });
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


// exports.post = async (req, res) => {
//       try {
//             const post = await Post.findOne({
//                   where: { id: req.params.id },
//             });
//             if (!post) {
//                   return res
//                         .status(404)
//                         .send({ message: "No existe la publicación" });
//             }
//             return res.status(200).send({ post });
//       } catch (err) {
//             return res
//                   .status(500)
//                   .send({ message: "Error al devolver la publiación" });
//       }
// };
