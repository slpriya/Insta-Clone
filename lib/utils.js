const jwt = require('jsonwebtoken');
const keys = require('../config/keys').secretOrKey;


module.exports = (user) => {

  const payload = {
    userid: user.id,
    email: user.email,
    username: user.username,
    mobile: user.mobile,
    avatar: user.avatar,
    iat: Date.now()
  }
  const options = { expiresIn: '1d' }

  const token = jwt.sign(payload, keys, options);
  return {
    success: true,
    token : 'Bearer ' + token
  };
}
