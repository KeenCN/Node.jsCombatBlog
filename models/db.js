var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

module.exports = new Db(APP_CONFIG_COMMON.db.dbName, new Server(APP_CONFIG_COMMON.db.host, Connection.DEFAULT_PORT), {safe: true});
