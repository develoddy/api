const router = require("express").Router();

const { Image } = require("../db");
const path = require("path");
const fs = require("fs");
const image = require("../models/image");

// UPLOAD IMAGE
exports.upload = async (req, res) => {
        try {
                if (req.file == undefined) {
                        return res.send(`You must select a file.`);
                }
                fs.renameSync(
                        req.file.path,
                        req.file.path + "." + req.file.mimetype.split("/")[1]
                );
                const src = req.file.path + "." + req.file.mimetype.split("/")[1];
                const image = await Image.create({
                        src: src,
                        title: req.file.originalname,
                        content: req.file.originalname,
                        user_id: req.userId,
                        level_id: 1,
                        album_id: 1,
                        created_at: null,
                        updated_at: null,
                });
                res.json(image);
        } catch (err) {
                res.json("Error upload image in server");
        }
};

// UPLOAD MULTIPLE IMAGE
exports.uploadmult = async (req, res) => {
        try {
                if (req.files == undefined) {
                        return res.send(`You must select a file.`);
                }

                var image;
                for (const key in req.files) {
                        fs.renameSync(
                                req.files[key].path,
                                req.files[key].path +
                                        "." +
                                        req.files[key].mimetype.split("/")[1]
                        );
                        image = await Image.create({
                                src:
                                        req.files[key].path +
                                        "." +
                                        req.files[key].mimetype.split("/")[1],
                                title: null,
                                content: null,
                                user_id: req.userId,
                                level_id: 1,
                                album_id: 1,
                                created_at: null,
                                updated_at: null,
                        });
                }
                if (image) {
                        res.send("Muchas Imagenes insertado");
                } else {
                        res.send("Hubo un error al insertar muchas images");
                }
        } catch (err) {
                res.json("Error upload image in server");
        }
};
