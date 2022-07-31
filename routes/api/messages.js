const router = require('express').Router();

const messageController = require('../../controllers/message');

router.post('/', messageController.createMessage);
router.post('/conver', messageController.createConversation);
router.get('/mymessages/:page?', messageController.getReceivedMessages);
router.get('/emit/:page?', messageController.getEmitMessages);
router.get('/unviewed', messageController.getUnviewedMessages);
router.get('/setviewed', messageController.getSetViewedMessages);

module.exports = router;