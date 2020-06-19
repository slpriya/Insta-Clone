const router = require('express').Router();
const controller = require('../controllers/user.controller');


// @route   POST  http://localhost:7500/api/users/register
// @desc    Register User
// @access  public
router.post('/register' , controller.register);

// @route   POST http://localhost:7500/api/users/login
// @desc    Login User
// @access  public


// router.post('/login' , controller.login); 




module.exports = router;