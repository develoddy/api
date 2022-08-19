const router = require('express').Router();
const commentController = require('../../controllers/comment');
const { check } = require('express-validator');
const middlewares = require('../middlewares');



// CREATE
router.post('/create', middlewares.checkToken, commentController.create);

// READ
router.get('/read', middlewares.checkToken, commentController.read);

// READ
//router.get('/:page?', middlewares.checkToken, userController.getUsers);

// UPDATE
//router.put('/:userId', middlewares.checkToken, userController.update);

// DELETE
router.delete('/delete/:id', middlewares.checkToken, commentController.delete);

router.get("/forecast", commentController.socketRouter)




module.exports = router;