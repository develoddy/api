const router = require('express').Router();

const { Follow, User, Profile } = require('../db');

//const path = require('path');
//const fs = require('fs');

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: follows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, follows, totalPages, currentPage };
};


// FOLLOW
exports.createFollow = async (req, res) => {
    try {
        const follow = await Follow.create({ 
            user_id: req.userId, 
            followed_id: req.body.followed_id,
            created_at : null,
            updated_at : null,
        });
        res.json(follow);
    } catch (err) {
        res.json('Error prueba follow');
    }
}

// DELETE FOLLOW
exports.deleteFollow = async (req, res) => {
    try {
        await Follow.destroy({ where: { 
            user_id: req.userId, 
            followed_id:  req.params.followed_id} 
        });
        res.json({ success: 'Se ha borrado el follow' });
    } catch (err) {
        res.json('Error prueba follow');
    }
}




/**
 * getFollowindUsers
 * @description Listar a los usuarios que yo sigo.
 * @param {*} req 
 * @param {*} res 
 */
exports.getFollowindUsers = async (req, res) => {
    try {
        var userId = req.userId;

        if( req.params.userId && req.params.page ) {
            userId = req.params.userId;
        }

        var page = 1;
        if ( req.params.page ) {
            page = req.params.page;
        } else {
            page = req.params.userId;
        }

        var size = 2;

        const { limit, offset } = getPagination(page, size);

        // await User.findAndCountAll({
        //     include: [{
        //         model: Follow
        //     }],
        //     where: { id: userId } , limit, offset 
        // }).then ( data => {
        //     const response = getPagingData(data, page, limit);
        //     res.send(response);
        // }).catch(err => {
        //     res.status(500).send({message: err.message || "Some error occurred while retrieving follows."});
        // });

       
        await Follow.findAndCountAll({ 
            where: { user_id: userId }
        }).then(data => {
                var array_clean = [];
                data.rows.forEach( e => {
                    array_clean.push(e.followed_id);
                });

                User.findAndCountAll ({
                    include: [{
                        model: Profile,
                        attributes: ["bio", "image_header"]
                    }],
                    attributes: ["id","name","username"],
                    where: { id: array_clean } , limit, offset 
                }).then(data => {
                    const response = getPagingData(data, page, limit);
                    res.json(response)
                });
        }).catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving follows."
                });
        });
    } catch (err) {
        console.log(err);
        res.json('Error pagination follows');
    }
}




/**
 * getFollowedUsers
 * @description Listar a los usuarios que me siguen.
 * @param {*} req 
 * @param {*} res 
 */
exports.getFollowedUsers = async (req, res) => {
    try {

        var userId = req.userId;

        if( req.params.userId && req.params.page ) {
            userId = req.params.userId;
        }

        var page = 1;
        if ( req.params.page ) {
            page = req.params.page;
        } else {
            page = req.params.userId;
        }

        var size = 2;

        const { limit, offset } = getPagination(page, size);

        /*Follow.findAndCountAll({
            include: [{
                model: User,
                attributes: ["id", "name"],
            }],
            where: { followed_id: userId }, limit, offset })
        .then(data => {
                const response = getPagingData(data, page, limit);
                res.send(response);
            })
        .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving follows."
                });
        });*/

        await Follow.findAndCountAll({ 
            where: { followed_id: userId }
        }).then(data => {
                var array_clean = [];
                data.rows.forEach( e => {
                    array_clean.push(e.user_id);
                });

                User.findAndCountAll ({
                    include: [{
                        model: Profile,
                        attributes: ["bio", "image_header"]
                    }],
                    attributes: ["id","name","username"],
                    where: { id: array_clean } , limit, offset 
                }).then(data => {
                    const response = getPagingData(data, page, limit);
                    res.json(response)
                });
        }).catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving follows."
                });
        });

    } catch (err) {
        res.json('Error pagination follows');
    }
}



exports.getMyFollows = async (req, res) => {
    try {
        var userId = req.userId;

        const data = await Follow.findAndCountAll({ 
            where: { user_id: userId }
        });

        var array_clean = [];
        data.rows.forEach( e => {
            array_clean.push(e.followed_id);
        });

        var find = await User.findAndCountAll ({
            include: [{
                model: Profile,
                attributes: ["bio", "image_header"]
            }],
            attributes: ["id","name","username"],
            where: { id: array_clean } 
        });
        
       
        // Me sacaria los usuarios que me están siguiendo
        if( req.params.followed ) {
            find = await Follow.findAll({ 
                where: { followed_id: userId },
                include: [{
                    model: User,
                    attributes: ["id", "name"],
                }],
            });
        }
        res.json({follows:find} );
        
        //res.json(find);
    } catch (err) {
        console.log(err);
        res.json('Error prueba follow');
    }
}

