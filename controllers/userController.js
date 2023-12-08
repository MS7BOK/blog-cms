// Example home-routes.js
const router = require('express').Router();

router.get('/', (req, res) => {
  // Fetch and render blog posts using Handlebars template
  res.render('homepage');
});

module.exports = router;
