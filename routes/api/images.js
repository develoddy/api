const router = require('express').Router();

const imageController = require('../../controllers/image');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const middlewares = require('../middlewares');

// CREATE
router.post('/upload', upload.single('image'), middlewares.checkToken, imageController.upload);

router.post('/uploadmult', upload.array('imagenes'), middlewares.checkToken, imageController.uploadmult);

module.exports = router;