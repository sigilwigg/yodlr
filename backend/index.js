// ----- [///// DEPENDANCIES /////] -----
const express = require('express');
const debug = require('debug')('frontend-code-challenge');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./lib/logger');

const { NotFoundError } = require('./expressError');

const authRoutes = require('./routes/auth');
const users = require('./routes/users');


// ----- [///// CONFIG /////] -----
const app = express();
const log = logger(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ----- [///// ROUTES /////] -----
app.use('/auth', authRoutes);
app.use('/users', users);


// ----- [///// ERROR HANDLING /////] -----
/** 404 Errors */
app.use(function (req, res, next) {
    return next(new NotFoundError())
});

/** Generic Errors */
app.use(function (err, req, res, next) {
    log.error(err);
    res.status(err.status || 500);
    return res.json({
        message: err.message,
        error: err
    });
});


// ----- [///// INITIALIZE SERVER /////] -----
/** Server Config */
app.set('port', process.env.PORT || 3000);

/** Start Server */
const server = app.listen(app.get('port'), function () {
    log.info('Express server listening on http://localhost:%d', server.address().port);
});