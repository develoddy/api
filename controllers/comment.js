const router = require("express").Router();

const { Comment, Post, User, Profile } = require("../db");
const { validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

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
 * CREAR COMMENTARIO
 * @param {*} req
 * @param {*} res
 */

/**
 * 
 * Explicación:
 * id: Llave primaria
 * type_id: Tipo, si es para posts, imágenes, albums etc.
 * ref_id: El id del del post, imagen o album según el caso.
 * user_id: El id del usuario que crea el comentario
 * content: Contenido del comentario
 * comment_id: Si es un comentario de otro comentario, se guarda el id del comentario superior
 * created_at: Fecha de creación
 * 
 * `postId` int(11) DEFAULT NULL,
 * `userId` int(11) DEFAULT NULL,
 * `commentId` int(11) DEFAULT NULL,
 * 
 */

exports.create = async ( req, res ) => {
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

exports.read = async ( req, res ) => {
    try {
        //const comment = await Comment.findAll();
        //res.json( comment ); 
        const comment = await Comment.findAll();

        var comment_id_clean = [];

        comment.forEach(( element ) => {
            comment_id_clean.push(element.id);
        });

    
        const commentdata = await Comment.findAll({
            include: [{
                model: Comment
            }],
            where: {commentId: comment_id_clean}
        });        
        res.json(commentdata);

    } catch {
        res.json("Error de lectura de comentarios...");
    }
};

exports.delete = async ( req, res ) => {
    try {
        const comment = await Comment.destroy({ where: { id: req.params.id } });
        if ( !comment ) {
              return res.status(404).send({ message: "No se ha borrado el commentario." });
        }
        return res.status(200).send({ message: "Se ha borrado el commentario con existo!" });
    } catch (error) {
        res.json("Error de borrado de comentarios...");
        return res.status( 500 ).send({ message: "Error de borrado de comentarios..." });
    }

};