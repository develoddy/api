// 'use strict'

const router = require('express').Router();

const middlewares = require('./middlewares');
const apiUsersRouter = require('./api/users');
const apiPostsRouter = require('./api/posts');
const apiCountriesRouter = require('./api/countries');
const apiImagesRouter = require('./api/images');
const apiFollowsRouter = require('./api/follows');
const apiMessagesRouter = require('./api/messages');
const apiCommentsRouter = require('./api/comments');


router.use('/users', apiUsersRouter);
router.use('/posts',  apiPostsRouter);
router.use('/countries', apiCountriesRouter);
router.use('/images', apiImagesRouter);
router.use('/follows', apiFollowsRouter);
router.use('/messages', middlewares.checkToken, apiMessagesRouter);
router.use('/comments', apiCommentsRouter);

module.exports = router;