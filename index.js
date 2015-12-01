var express = require('express');
var bodyParser = require('body-parser');

var db = require('mysql');
var connection = db.createConnection({
    user: 'ljmcdade',
    host: '127.0.0.1',
    database: 'addressbook'
});


var app = express();
app.use(bodyParser.json());

app.use(function(request, response, next){
    request.accountId = 1;
    next();
});


app.get('/', function(request, response) {
    console.log(request.accountId);
    connection.query('select * from Account', function(error, result) {
            if (error) {
                console.log('error');
            }
            else if (result) {
                response.send(result);
            }
        }

    );

connection.end();
});



var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});



// app.get('...
