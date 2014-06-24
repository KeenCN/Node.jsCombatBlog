var settings = require(CONFIG_ROOT + '/common.json'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

settings = settings.application[APP_NAME];
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT), {safe: true});
