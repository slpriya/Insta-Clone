const express = require('express');
const app = express();
const users = require('./routes/user.route');
const bodyparser = require('body-parser');
const port = require('./config/keys').port;
const passport = require('passport');

require('./config/database');
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

// Homepage route
app.get('/', (req, res) => res.send('Aperture'));

app.listen(port, () => console.log(`Server has started on http://localhost:${port}`));

app.use('/api/users' , users);