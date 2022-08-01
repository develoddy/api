const router = require("express").Router();

const { User, Follow, Post, Profile, Image } = require("../db");
const { validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
//const follow = require('../models/follow');

const getPagination = (page, size) => {
      const limit = size ? +size : 3;
      const offset = page ? page * limit : 0;
      return { limit, offset };
};

const getPagingData = (data, page, limit) => {
      const { count: totalItems, rows: profiles } = data;
      const currentPage = page ? +page : 0;
      const totalPages = Math.ceil(totalItems / limit);

      return { totalItems, profiles, totalPages, currentPage };
};




/**
 * userData
 * @param {*} req 
 * @param {*} res 
 */
exports.userData = async (req, res) => {
      try {
            await User.findAll({
                  include: [{
                        model: Profile,
                        attributes: ["userId", "bio", "image_header"]
                  }, {
                        model: Post,
                        attributes: ["id", "content", "userId"],
                        include: [{
                              model: Image,
                              attributes: ["id", "src", "title"],
                        }]
                  }, {
                        model: Follow
                  }],
                  // include: [{
                  //       model: Follow
                  // }],
                  attributes: ["name", "email"]
            }).then(users => res.json(users));
            
      } catch (err) {
            console.log(err)
            res.json("Error create user");
      }
};




/**
 * CREATE USER
 * @param {*} req
 * @param {*} res
 */
exports.create = async (req, res) => {
      try {
            const user = await User.create(req.body);
            res.json(user);
      } catch (err) {
            res.json("Error create user");
      }
};

/**
 * LIST USER ALL
 * @param {*} req
 * @param {*} res
 */
exports.getUsers = async (req, res) => {
      try {
            var userId = req.userId;

            var page = 0;

            if (req.params.page) {
                  page = req.params.page;
            }

            var size = 4;

            const { limit, offset } = getPagination(page, size);

            // Profiles
            // const profile = await Profile.findAndCountAll({
            //       attributes: ["bio", "userId"],
            //       include: [
            //             {
            //                   model: User,
            //                   attributes: ["id", "name", "username", "email"],
            //             },
            //       ],
            //       limit,
            //       offset,
            // });


            const user = await User.findAndCountAll({
                  include: [{
                        model: Profile,
                        attributes: ["bio", "image_header"]
                  }],
                  attributes: ["id", "username"],
                  limit,
                  offset,   
            });

            if (!user) {
                  res.json("No hay profiles");
            }

            const response = getPagingData(user, page, limit);

            // Following - Listar usuarios que yo sigo
            const following = await Follow.findAll({
                  attributes: ["followed_id"],
                  where: { user_id: userId },
            });
            if (!following) {
                  res.json("No hay following");
            }
            var following_clean = [];
            following.forEach((element) => {
                  following_clean.push(element.followed_id);
            });

            // Followed - Listar usuarios que me siguen
            const followed = await Follow.findAll({
                  attributes: ["user_id"],
                  where: { followed_id: userId },
            });
            if (!followed) {
                  res.json("No hay followed");
            }
            var followed_clean = [];
            followed.forEach((element) => {
                  followed_clean.push(element.user_id);
            });
            res.json({
                  res_users: response,
                  users_following: following_clean,
                  users_followed: followed_clean,
            });
      } catch (err) {
            res.json("Error read user" + err);
      }
};


/**
 * LIST POST BY ID
 * @param {*} req
 * @param {*} res
 */
exports.getUser = async (req, res) => {
      try {
            const user = await User.findOne({
                  include: [{
                        model: Profile,
                        attributes: ["bio", "image_header"]
                  }],
                  attributes: ["id", "name", "username", "email"],
                  where: { id: req.params.userId },
            });

            const follow = await Follow.findOne({ 
                  where: { 
                        user_id: req.userId, 
                        followed_id: req.params.userId
                  },
                  attributes: ["user_id", "followed_id"],
            });

            if (!user) {
                  return res.status(400).json("Backend: El usario no existe");
            }

            res.json({user, follow});


            //  const user = await User.findOne({ 
            //       include: [ {
            //             model: Profile,
            //             attributes: ["bio", "image_header"]
            //       }, {
            //             model: Follow,
                        
            //       }],
            //       attributes: ["id", "username"],
            //       where: { id: req.params.userId },
                 
            // });

            // res.json( {user: user} );

           


      } catch (err) {
            res.json("Error read user by id : " + err);
      }
};

/**
 * UPDATE USER BY ID
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
      try {
            // Se verifica si el password coincide con el usuario a modificar
            const user = await User.findOne({
                  where: { id: req.params.userId, email: req.body.email },
            });
            const isValid = await bcrypt.compareSync(
                  req.body.password,
                  user.password
            );
            if (!isValid)
                  return res.status(400).json("invalid email or password!");

            req.body.password = user.password;
            //req.body.password = req.body.password = bcrypt.hashSync(req.body.password, 10);
            await User.update(req.body, { where: { id: req.params.userId } });
            //res.json({ success: 'Se ha modificado el usuario' });
            return res.status(200).json("Backend: Se ha modificado el usuario");
      } catch (err) {
            return res
                  .status(500)
                  .json({ error: "Backend: Error update user" });
      }
};

/**
 * DELETE USER BY ID
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
      try {
            await User.destroy({ where: { id: req.params.userId } });
            res.json({ success: "Se ha borrado el usuario" });
      } catch (err) {
            res.json("Error delete user");
      }
};

/**
 * GET COUNTERS
 * COUNT FOLLOWING, COUNT FOLLOWED, COUNT POST
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getCounters = async (req, res) => {
      try {
            var userId = req.userId;
            if (req.params.id) {
                  userId = req.params.id;
            }
            const following = await Follow.count({
                  where: { user_id: userId },
            });

            const followed = await Follow.count({
                  where: { followed_id: userId },
            });

            const posts = await Post.count({
                  where: { author_ref_id: userId },
            });

            return res.status(200).send({
                  following: following,
                  followed: followed,
                  posts: posts,
            });
      } catch (err) {
            return res.status(500).send({ message: "Error counters" });
      }
};

/**
 * GET IMAGE
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getImageFile = async (req, res) => {
      var image_file = req.params.imageFile;
      var path_file = "public/images/" + image_file;

      const valid = fs.existsSync(path_file);
      if (valid) {
            res.sendFile(path.resolve(path_file));
      } else {
            res.json({
                  message: "No existe la imagen...",
            });
      }
};

/**
 * REGISTER
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.register = async (req, res) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(422).json({ errores: errors.array() });
            }
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await User.create(req.body);
            res.json(user);
      } catch (err) {
            res.json("Error register user");
      }
};


exports.searchUser = async (req, res) => {

      try {
            var filter = req.params.filter;
            const user = await User.findAll({
                  include: [{
                        model: Profile,
                        attributes: ["image_header"],      
                  }],
                  attributes: ["id", "name", "username", "email"],
                  where: {
                        name: {
                          [Op.like]: '%'+filter+'%',
                        },
                  },
            });

            res.json(user);

      } catch (err) {
            res.json("Error search user");
      }
};




/**
 * LOGIN USER
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.login = async (req, res) => {
      try {
             const user = await User.findOne({ 
                  include: [{
                        model: Profile,
                        attributes: ["bio", "image_header"]
                  }],
                  where: { email: req.body.email } 
            });
            if ( user ) {
                  const correct = bcrypt.compareSync(
                        req.body.password,
                        user.password
                  );
                  if (correct) {
                        user.password = undefined;
                        res.json({
                              success: createToken(user),
                              user: user,
                        });
                        //return res.status(200).send({success:createToken(user), user: user });
                  } else {
                        res.json({
                              error: "Error en usuario y/o contrasenia.",
                        });
                        //return res.status(404).send({message: "Error en usuario y/o contraseña."});
                  }
            } else {
                  res.json({
                        error: "Error en usuario y/o contrasenia",
                  });
                  //return res.status(404).send({message: "Error en usuario y/o contrasenia"});
            }
      } catch (err) {
            console.log(err);
            res.json("Error en la petición" + err);
      }
};

/**
 * GENARET TOKEN USER
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createToken = (user) => {
      const payload = {
            userId: user.id,
            cretedAt: moment().unix(),
            expiredAt: moment().add(360, "minutes").unix(),
      };
      return jwt.encode(payload, "frase secreta");
};
