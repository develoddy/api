const Sequelize = require('sequelize');
 const router = require('express').Router();
const { Message, User, Follow, Conversation, Profile } = require('../db');
const uuid = require('uuid');
const { where } = require('sequelize');


const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: user } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, user, totalPages, currentPage };
};

/**
 * CREATE NEW MESSAGE
 * @param {req.body} req 
 * @param {*} res 
 * @returns 
 */
exports.createMessage = async (req, res) => {
    try {

        if ( !req.body.content ) {
            return res.status(404).send({messages: "Envia los datos messages"});
        }

        const existIdConver = await Conversation.findAll({
            where: {id: req.body.conversationId}
        });

        // si no existe el id de conversación, entonces se crea uno
        if (existIdConver) {
            const conversation = await Conversation.create({
                "id": req.body.conversationId,
                "sender_id": req.userId,
                "receptor_id": req.body.userId,
                "created_at": null,
                "updated_at": null,
            });
            if ( !conversation ) {
                return res.status(500).send({messages: "Error al crear la conversacion..."});
            }
        }

        const conver = await Conversation.findAll({
            where:{ sender_id: req.body.userId }
        });

        if ( !conver ) {
            return res.status(500).send({messages: "no se ha encontrado el user en conver"});
        }

        if ( !req.body.conversationId) {
            return res.status(404).send({messages: "id de conversation_id está vacio"});
        }

        const message = await Message.create({
            "content": req.body.content,
            "user_id": 0,
            "conversation_id": 0,
            "created_at": null,
            "updated_at": null,
            "is_read": 0,
            "conversationId": req.body.conversationId,
            "userId": req.userId
        });

        if ( !message ) {
            return res.status(500).send({messages: "Error al enviar el mensage"});
        }
        return res.status(200).send(message);
    } catch ( err ) {
        console.log(err);
        return res.status(500).send({messages: "Error en la petición"});
    }
}



/**
 * CREATE CONVER
 * @param {req.body} req 
 * @param {*} res 
 * @returns 
 */
exports.createConversation = async (req, res) => {
    try {
        if ( !req.body.sender_id || !req.body.receptor_id ) {
            return res.status(404).send({messages: "Enviar datos de la conversation"});
        }
        const conver = await Conversation.create( req.body );
        if ( !conver ) {
            return res.status(500).send({messages: "Error al crear la conver"});
        }
        return res.status(200).send(conver);

    } catch ( err ) {
        return res.status(500).send({messages: "Error en la petición"});
    }
}


/**
 * GET RECEIVED MESSAGES
 * @Description Listar los mensajes que hemos recibido
 * @param {req.userId} req 
 * @param {*} res 
 */
 exports.getReceivedMessages = async (req, res) => {
    try {

        var userId = req.userId;
        
        var page = 0;

        if ( req.params.page ) {
            page = req.params.page;
        } 

        var size = 3;

        const { limit, offset } = getPagination(page, size);

        await Conversation.findAndCountAll({
            include: [ {
                model: User,
                include: [{
                    model: Profile,
                    attributes: ["image_header"],
                }],
                attributes: ["id", "name", "email"]
            },{
                model: Message,
                include: [{
                    model: User,
                    attributes: ["id", "name", "email"]
                }],
                attributes: ["content"]
            }],
            attributes: ["sender_id", "receptor_id"],
            where: { receptor_id: userId}, limit, offset,
            order: [["id", "DESC"]], 
        }).then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while retrieving follows."});
        });
        
    } catch ( err ) {
        console.log(err);
        res.status(500).send(err);
    }
}


/**
 * GET EMIT MESSAGES
 * @description Listar el total de mensajes que yo he enviado
 * @param {req.userId} req 
 * @param {*} res 
 */
 exports.getEmitMessages = async (req, res) => {

    try {

        var userId = req.userId;
        
        var page = 0;

        if ( req.params.page ) {
            page = req.params.page;
        } 

        var size = 2;

        const { limit, offset } = getPagination(page, size);

        await Conversation.findAndCountAll({
            include: [ {
                model: User,
                include: [{
                    model: Profile,
                    attributes: ["image_header"],
                }],
                attributes: ["id", "name", "email"]
            },{
                model: Message,
                include: [{
                    model: User,
                    attributes: ["id", "name", "email"]
                }],
                attributes: ["content"]
            }],
            attributes: ["sender_id", "receptor_id"],
            where: { sender_id: userId}, limit, offset,
            order: [["id", "DESC"]], 
        }).then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while retrieving follows."});
        });

    } catch ( err ) {
        console.log(err);
        res.status(500).send(err);
    }
}





/**
 * GET UNVIEWED MESSAGES
 * @description Contar los mensajes sin leer.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getUnviewedMessages = async (req, res) => { 
    try {
        const conversation = await Conversation.findAll ({
            include: [{
                model: Message,
                attributes: ["is_read", [Sequelize.fn("COUNT", Sequelize.col("is_read")), "messagesNotRead"]],
                group: ['is_read'],
                where: {is_read: 0}
            }],
            attributes: [ "sender_id", "receptor_id" ],
            where: {receptor_id: req.userId},
        });

        if ( !conversation ) {
            return res.status(500).send({conversation: "Error al buscar el mensage no leido"});
        }

        return res.status(200).send({conversation: conversation});
    } catch ( err ) {
        console.log(err);
        return res.status(500).send({conversation: "Error en la petición"});
    }
}


/**
 * GET SET VIEWED MESSAGES
 * @description Cuando entramos en nuestros mensajes privados, y leamos nuestros mensajes que nos marque como leido 
 * @param {*} res 
 * @returns 
 */
 exports.getSetViewedMessages = async (req, res) => { 
    try {

        var userId = req.userId;
        //await User.update(req.body, { where: { id: req.params.userId } });

        // await Message.findAll({
        //     include: [{
        //         model: Conversation
        //     }],
        //     where: {userId: userId}
        // }).then( data => {
        //     res.json(data);
        // });

        await Conversation.findAndCountAll ({
            include: [{
                model: Message,
                attributes: ["id", "content"],
                where: {is_read: 0}
            }],
            attributes: [ "sender_id", "receptor_id" ],
            where: {receptor_id: userId},
        })
        .then( data => {
            var array_clean = [];
            data.rows.forEach(element => {
                element.messages.forEach(e => {
                    array_clean.push(e.id);
                })
            });

            //res.json(array_clean);
            const messagesUpdates =  Message.update({ is_read: 1}, { where: { id: array_clean } });
            res.json(messagesUpdates);
        });

        

       
        //return res.status(200).send({messages: messages});
    } catch ( err ) {
        console.log(err);
        return res.status(500).send({messages: "Error en la petición"});
    }
}