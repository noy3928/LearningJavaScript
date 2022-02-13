const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check')

// @route  POST api/users
// @desc   Test route
// @access Public  => 토큰이 필요한지 아닌지 
router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
] ,(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    console.log(req.body);
    res.send('User route')
});

module.exports = router; 

