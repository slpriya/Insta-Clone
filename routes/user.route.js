const router = require('express').Router();
const controller = require('../controllers/user.controller');
const passport = require('passport');


// @route   POST  http://localhost:7500/api/users/register
// @desc    Register User
// @access  public
router.post('/register' , controller.register);

// @route   POST http://localhost:7500/api/users/login
// @desc    Login User
// @access  public


router.post('/login' , controller.login); 

// @route   GET http://localhost:7500/api/users/current
// @desc    Get Current User
// @access  private

router.get('/current' , passport.authenticate('jwt',{session : false}) , controller.current); 

module.exports = router;