//set configure
global.DIR_ROOT = __dirname;
global.APP_ROOT = DIR_ROOT + '/application';
global.CORE_ROOT = DIR_ROOT + '/library';
global.MODEL_ROOT = DIR_ROOT + '/models';
global.CONFIG_ROOT = DIR_ROOT + '/config';
global.PUBLIC_ROOT = DIR_ROOT + '/public';

var express = require('express');
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settingsCommon = require(CONFIG_ROOT + '/common.json');
var flash = require('connect-flash');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var competence = require(MODEL_ROOT + '/competence');
//var routes = require(DIR_ROOT + '/library/route.js');
var routes = require(DIR_ROOT + '/library/route.js');

var app = express();

app.use(function(req, res, next){
    global.HOST_NAME = req.host;
    for(n in settingsCommon.application) {
        if(settingsCommon.application[n].domain == HOST_NAME) {
            global.APP_NAME = n;
            global.APP_CONFIG_COMMON = settingsCommon.application[n];
            global.APP_CONFIG_DIR = CONFIG_ROOT + '/' + n;
            global.CONTROLLER_ROOT = APP_ROOT + '/' + n + '/controller';
            global.VIEW_ROOT = APP_ROOT + '/' + n + '/views';

            // view engine setup
            app.set('views', VIEW_ROOT);
            app.set('view engine', 'ejs');
            return next();
        }
    }
    global.APP_NAME = 'default';
    global.APP_CONFIG_COMMON = settingsCommon.application.default;
    global.APP_CONFIG_DIR = CONFIG_ROOT + '/default';
    global.CONTROLLER_ROOT = APP_ROOT + '/default/controller';
    global.VIEW_ROOT = APP_ROOT + '/default/views';

    // view engine setup
    app.set('views', VIEW_ROOT);
    app.set('view engine', 'ejs');
    return next();
});

app.use(flash());

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

//init session
app.use(session({
    secret: settingsCommon.session.cookieSecret,
    key: settingsCommon.session.db,//cookie name
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, //30days
    store: new MongoStore({
        db: settingsCommon.session.db
    })
}));

app.use(express.static(PUBLIC_ROOT));

//competence
app.use(competence);
app.use(routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;