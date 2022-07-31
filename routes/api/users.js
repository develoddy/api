const router = require('express').Router();
const userController = require('../../controllers/user');
const { check } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const middlewares = require('../middlewares');


router.post('/userData', userController.userData);

// CREATE
router.post('/', userController.create);

// READ
router.get('/:page?', middlewares.checkToken, userController.getUsers);

// READ USER BY ID
router.get('/one/:userId', middlewares.checkToken, userController.getUser);

// UPDATE
router.put('/:userId', middlewares.checkToken, userController.update);

// DELETE
router.delete('/:userId', middlewares.checkToken, userController.delete);

//COUNTER
router.get('/counters/one/:id?', middlewares.checkToken, userController.getCounters);

//GETIMAGE
router.get('/get-image-user/:imageFile', userController.getImageFile);

// Filter
router.get('/get-user-filter/:filter', middlewares.checkToken, userController.searchUser);

// REGISTER
router.post('/register', [
    check('name', 'El nomnbre de usuario es obligatorio').not().isEmpty(),
    check('password', 'El password de usuario es obligatorio').not().isEmpty(),
    check('email', 'El email debe estar correcto').isEmail()
] , userController.register);

// LOGIN
router.post('/login', userController.login)


module.exports = router;