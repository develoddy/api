const router = require("express").Router();

const { Comment, Post, User, Profile, Image, Heart } = require("../db");
const { validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

const socket = require('../sockets');

const getPagination = (page, size) => {
    const limit = size ? +size : 2;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: profiles } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, profiles, totalPages, currentPage };
};


/*============== CRUD OF COMMENTS ===============
1. CREAR COMMENT.
2. READ COMMENTS.
3. UPDATE COMMENT.
4. DELETE COMMENT.
5. CREAR LIKE.
=================================================*/


/*
 * ------ INSERTAR COMENTARIO --------
 * EN ESTA FUNCION SE INSERTAR UN COMENTARIO.
 */
exports.create = async ( req, res) => {
    try {
        console.log(req.body);
        const create = await Comment.create( req.body );
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
          
                where: { postId: req.body.postId },
            });
            res.json(comment);

        } else {
            res.json("Not Success");
        }
        
    } catch ( err ) {
       console.log(err);
       res.json("Error create comentario");
    }
};


/*
 * ------ LISTAR COMENTARIOS --------
 * EN ESTA FUNCION SE LISTA TODOS LOS COMENTARIOS
 * EN GENERAL.
 */
exports.read = async ( req, res ) => {
    try {

        var page = 0;

        if ( req.params.page ) {
            
            page = req.params.page;
        }

        var size = 10;
        
        const { limit, offset } = getPagination(page, size);

        const comment = await Comment.findAll({
            include: [{
                model: User,
                attributes: ["id", "name", "username", "email"],
                include: [{
                    model: Profile,
                    attributes: ["bio", "image_header"]
                }],
            }],
            attributes: ["id", "postId", "userId", "content"],
            where: { postId: req.params.postId },
            //order: [["id", "ASC"]],
            limit,
            offset,
        });

        res.json(comment);

    } catch (error)  {
        console.log(error);
        res.json("Error de lectura de comentarios...");
    }
};



/*
 * ------ ACTUALIZAR COMENTARIO --------
 * EN ESTA FUNCION SE BORRA UN COMENTARIO 
 * EN BASE AL IDD¡ DEL COMENTARIO.
 */
exports.update = async ( req, res ) => {
    try {
        const update = await Comment.update(
            { content: req.body.content}, 
            { where: { id: req.body.idComment, postId: req.body.postId }}
        );
        // DEVUELVE 1 SI EL UPDATE FUE MODIFICADO EL TEXTO.
        // DEVUELVE 0 SI EL UPDATE NO TIENE MODIFICACION EN EL TEXTO.
        res.json(update);

    } catch ( err ) {
        console.log(err)
        res.json("Error update comment.")
    }
};



/*
 * ------ BORRAR COMENTARIO --------
 * EN ESTA FUNCION SE BORRA UN COMENTARIO 
 * EN BASE AL IDD¡ DEL COMENTARIO.
 */
exports.delete = async ( req, res ) => {
    try {
        const comment = await Comment.destroy({ 
            where: { id: req.params.id } 
        });
        if ( comment === 0 ) {
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


/*
 * --------- LIKES --------
 * MOSTRAR LOS ME GUSTA DE LOS COMENTARIOS
 */
 exports.showLikesComments = async ( req, res ) => {

    // muestra todo los usuarios que le han dado like a una publicación

    //postId 
    //
    try {


    } catch {

    }
 };




