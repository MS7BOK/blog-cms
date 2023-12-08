// Example index.js for routes setup
const router = require('express').Router();

const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);

module.exports = router;
