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

app.use(function(request, response, next) {
    request.accountId = 1;
    next();
});


app.get('/AddressBook/:id', function(request, response) {   // close js string open variable  
    //console.log(request.accountId);
    connection.query('select id, name from AddressBook where id=' + request.params.id + ' and accountId=' + request.accountId, function(error, result) {
        if (error) {
            console.log('error');
        }
        else if (result.length === 0) { // if the result contains something
            response.sendStatus(404); // tell the user that the result does not contain anything
            }
        else  {
            response.json(result[0]);
        }
    });
});



var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});



// app.get('...
