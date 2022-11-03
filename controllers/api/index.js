// this file is a collector of all API routes and will assign prefixes of corresponding route names
const router = require('express').Router();

const userControllers = require('./user-routes');

router.use('/users', userControllers);

module.exports = router;