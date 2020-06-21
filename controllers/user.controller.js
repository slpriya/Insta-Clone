const User = require('../models/User.model');
const gravatar = require('gravatar');//import gravatar
const issueJWT = require('../lib/utils');

module.exports = {
  register: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        processRequest(user, req, res)
      })
      .catch((err) => {
        console.log("err chk");
        res.status(500).json({
          message: "Some internal error Occured " + err.message
        })
      });
  },
  login: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
      .then((user) => {
        if (!user) {
           return res.status(401).json({ email: "User not found" });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch){

            const jwtToken = issueJWT(user);
            return res.send(jwtToken );
          }
          return res.status(400).json({ message: 'Password Incorrect!' });
        })
      }).catch( err =>{ 
        return res.status(500).json({message : `Internal error occured ${err.message}`});
      });//login ends here

    }
}

function processRequest(user, req, res) {
  if (user) {
    return res.status(400)
      .json({ success: false, message: "Registered Email already exists" });
  }
  createUser(req, res);
}

function createUser(req, res) {
  const avatar = gravatar.url(req.body.email,
    {
      s: '100', r: 'pg', d: 'mm', protocol: 'http'
    });
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    avatar
  });
  saveUserDocument(newUser, res);
}

function saveUserDocument(newUser, res) {
  newUser.save()
    .then((user) => {
      res.json({ success: true, user: user, message: 'User Successfullu Registered!' });
    })
    .catch(err => {
      res.status(500).send(
        { message: err.message || "Some error occurred while creating the User." });
    });
}

