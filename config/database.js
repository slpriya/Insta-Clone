const mongoose = require('mongoose');
const conStr = require('./keys').mongoURI;

mongoose.connect(conStr,{ useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true})
        .then( () => {console.log("Successfully connected to the database");} )
        .catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


