const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  mobile: {
    type: Number,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }

});

//before we save 
userSchema.pre('save' , function(next){

  let user = this;
    // only hash the password if it has been modified (or is new)
    if(!user.isModified('password')) return next();

    const saltRounds = 10;
    //generate salt
    bcrypt.genSalt(saltRounds, (err,salt) =>{
      if (err) return next(err);
      //to hash bcrypt.hash(newUser.password, saltRounds) //auto-gen a salt and hash
      bcrypt.hash(user.password, salt , (err,hash) =>{
        if (err) return next(err);
        user.password = hash;
        next();
      }); 
    });
});


module.exports = userModel =mongoose.model('users', userSchema);