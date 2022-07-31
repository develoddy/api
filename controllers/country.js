const router = require('express').Router();

const { Country } = require('../db');


// CREATE
exports.create = async (req, res) => {
    try {
        const country = await Country.create(req.body);
        res.json(country);
    } catch (err) {
        res.json('Error create country');
    }
}

// READ
exports.read = async (req, res) => {
    try {
        //console.log(req.userId);
        const contries = await Country.findAll();
        res.json(contries);
    } catch (err) {
        res.json('Error a listar los Country');
    }
}

// UPDATE
exports.update = async (req, res) => {
    try {
        await Country.update( req.body, {where: { id: req.params.userId }});
        res.json({ success: 'Se ha modificado el Country' });
    } catch (err) {
        res.json('Error update Country');
    }
}

// DELETE
exports.delete = async (req, res) => {
    try {
        await Country.destroy({where: { id: req.params.userId }});
        res.json({ success: 'Se ha borrado el Country' });
    } catch (err) {
        res.json('Error delete Country');
    }
}
