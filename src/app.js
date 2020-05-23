const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const config = require('./config')();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());

// api routes
app.use('/users', require('./routes/user'));
app.use('/notifications', require('./routes/notifications'));

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;

app.listen(port, function () {
    mongoose.connect(config.mongo, {useNewUrlParser: true, useUnifiedTopology : true});
    mongoose.set('useCreateIndex', true);
    const db = mongoose.connection;
    db.on('error',console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log(`Express server listening on port ${port}`);
    });
});
