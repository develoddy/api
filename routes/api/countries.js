const router = require('express').Router();

const { Country } = require('../../db');
const countryController = require('../../controllers/country');


// CREATE
router.post('/', countryController.create);
// READ
router.get('/', countryController.read);
// UPDATE
router.put('/:userId', countryController.update);
// DELETE
router.delete('/:userId', countryController.delete);


module.exports = router;