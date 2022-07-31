const router = require('express').Router();

const followController = require('../../controllers/follow');
const middlewares = require('../middlewares');

router.post('/', middlewares.checkToken, followController.createFollow);
router.delete('/:followed_id', middlewares.checkToken, followController.deleteFollow);
router.get('/following/:userId?/:page?', middlewares.checkToken, followController.getFollowindUsers);
router.get('/followed/:userId?/:page?', middlewares.checkToken, followController.getFollowedUsers);
router.get('/getMyfollows/:followed?', middlewares.checkToken, followController.getMyFollows);

module.exports = router;