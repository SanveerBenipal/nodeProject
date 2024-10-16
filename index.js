const express = require('express');
const mongoose = require('mongoose');
const coookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    coookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,   //days hours minute seconds millisecond
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5050;
app.listen(PORT);