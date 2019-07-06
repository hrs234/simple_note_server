'use strict'

var fun = require('./controller');
const cors = require('cors');

module.exports = function(app)
{

    
    // logger middleware
    app.use(function (req, res, next) {
        console.log('================LOGS=================');
        console.log('HOST   : ' + req.headers.host); 
        console.log('METHOD : ' + req.method); 
        console.log('PATH   : ' + req.path ); 
        console.log('ORIGIN : ' + req.headers.origin);
        console.log('=====================================');
        next();
    });
    
    
    
    // list of whitelisted domain
    var whitelistDomain = ['http://localhost:4000', 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop', 'http://192.168.56.1', undefined, 'http://localhost'];

    // declares an option cors option
    var corsOps =
    {
        origin: function (origin, next) {


            if (whitelistDomain.indexOf(origin) !== -1) {
                // whitelisted or passed CORS
                next(null, next);
            }
            else {
                // non-whitelisted domain gets an error message
                next('[BLOCKED] your domain is not whitelisted to use this REST api your ORIGIN:' + origin);
            }

        }
    };
     
        
    // app.use(cors(corsOps));        
            
            
    // index routes
    app.get('/', cors(),fun.index); 

    // view data
    app.get('/notes', cors(), fun.test_concat);    

    // insert note
    app.post('/notes', cors(corsOps), fun.insert_note_api);

    // update_note
    app.put('/notes', cors(corsOps), fun.update_note_api);

    // delete note
    app.delete('/notes', cors(corsOps), fun.delete_note_api);
    

//////////////////////////////////////////////////////////////////////////////////////////////


    // view categories
    app.get('/categories', cors(corsOps), fun.test_concat_categories);

    // insert categories
    app.post('/categories', cors(corsOps), fun.insert_note_category_api);
    
    // update categories
    app.put('/categories', cors(corsOps), fun.update_note_category_api);
    
    // delete categories
    app.delete('/categories', cors(corsOps), fun.delete_categories_api);
    

    // tester route
    

};