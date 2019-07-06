'use strict'

var conn = require('./conn');
// var controller = require('./controller')

exports.getCount_note = function(callback)
{

    // controller.kirim_count(function(sendback)
    // {
        var query;
        // var s = req.query.search || '';
        
            query = `select count(*) as banyak from note`;
        
        
        conn.query(query, function (error, rows) 
        {
            // var a = rows;
    
            if(error)
            {
                console.log('error : '+error);
                // console.log(query);
            }
            else
            {
                callback(rows[0]['banyak']);
                // console.log(query);
            }
    
            // return a;    
            // app.send(rows);
        });

    // });

};

