const express = require('express');
const router = express.Router();

// @route  GET api/posts
// @desc   Test route
// @access Public  => 토큰이 필요한지 아닌지 
router.get('/', (req, res) => res.send('Post route'));

module.exports = router; 

