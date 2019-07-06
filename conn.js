var mysql = require('mysql');
var proms = require('bluebird');

var setting = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};


var conn = mysql.createConnection(setting);

var queryAsync = proms.promisify(conn.query.bind(conn));

conn.connect(function(error)
{
    if(error)
    {
        console.log('[DATABASE] Database Connection Problem, reason: '+error);
    }
    else
    {
        console.log('[DATABASE] Database connection success');
    }

});



module.exports = conn;
