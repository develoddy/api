const router = require('express').Router();
const commentController = require('../../controllers/comment');
const { check } = require('express-validator');
const middlewares = require('../middlewares');



// CREATE
router.post('/create', middlewares.checkToken, commentController.create);

// READ
router.get('/read/:postId/:page?', middlewares.checkToken, commentController.read);

// UPDATE
router.put('/update', middlewares.checkToken, commentController.update);

// DELETE
router.delete('/delete/:id', middlewares.checkToken, commentController.delete);






module.exports = router;