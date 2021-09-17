const router = require('express').Router();
const { getUsers, getUserById } = require('../controllers/user.controller');
const { handleAsyncErrors } = require('../middlewares/errors');

router.get('/', handleAsyncErrors(getUsers));

router.get('/:id', handleAsyncErrors(getUserById));

module.exports = router;
