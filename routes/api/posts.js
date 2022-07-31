const router = require('express').Router();

const multer = require('multer');
const upload = multer({ dest: 'public/posts' });
const { Post } = require('../../db');
const postController = require('../../controllers/post');
const middlewares = require('../middlewares');

router.post('/', middlewares.checkToken, postController.create);
router.get('/:page?', middlewares.checkToken,  postController.posts);
router.get('/postimages/:page?', middlewares.checkToken,  postController.postsImagesUser);
router.get('/user/:user_id/:page?', middlewares.checkToken,  postController.postsUser);
router.get('/one/:id', middlewares.checkToken,  postController.post);
router.delete('/:id', middlewares.checkToken,  postController.delete);
router.post('/upload/:postId', middlewares.checkToken,  upload.array('imagenes'), postController.upload);
router.get('/get-image-post/:imageFile',  postController.getImageFile);


module.exports = router;