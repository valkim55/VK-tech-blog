// this file collects the endpoints and assigns prefix /api to them
// and to make sure that if user makes a request to an endpoint that doesn't exist they 404 error will pop up
const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;