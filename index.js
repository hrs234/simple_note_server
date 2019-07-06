// library list
require('dotenv').config();
var express = require('express'), 
app = express(), 
port = process.env.PORT_SERVER || 3000,
bodyParser = require('body-parser');
var route = require('./routes');




app.use(bodyParser.urlencoded(
    {
        extended: true
    }));
app.use(bodyParser.json());


// cors middleware
// app.use(cors(corsOps));


route(app);

app.listen(port);

console.log(' ');

const os = require('os');
let networkInterfaces = os.networkInterfaces();
for (let inet in networkInterfaces) {
    let addresses = networkInterfaces[inet];
    for (let i = 0; i < addresses.length; i++) {
        let address = addresses[i];
        if (!address.internal) {
            console.log(`[SERVER] ${address.address}:${port}`);
        }
    }
}
console.log(' ');
