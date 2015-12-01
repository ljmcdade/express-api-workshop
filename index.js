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


app.put('/AddressBook/:id', function(request, response) {
    connection.query("update AddressBook set name='" + request.body.name + "'where AddressBook.id=" + request.params.id, function(error, result){
        //console.log(request.body);
        if (error){
            response.sendStatus(404);
        }
        else {
            connection.query("select * from AddressBook where AddressBook.id=" + request.params.id, function(error, result){
                console.log(result);
                response.json(result);
            })}
        
    });
});


app.delete('/AddressBook/:id', function(request, response) {
    if (request.body.accountId) {
        connection.query("delete from AddressBook where AddressBook.id=" + request.params.id, function(error, result) {
            if (error) {
                //console.log(error);
                response.sendStatus(404);
            }
            else {
                console.log(result);
            }
        });
    }
});


app.post('/AddressBook', function(request, response) {
    if (request.body.name) {
        connection.query("insert into AddressBook (accountId, name) values (" + request.accountId + ", '" + request.body.name + "')",
            function(error, result) {
                if (error) {
                    //console.log('error');
                    response.sendStatus(404);
                }
                else if (result) {
                    console.log(result);
                    response.json(result);
                }
                response.end();


            });
    }
});



app.get('/AddressBook/:id', function(request, response) { // close js string open variable  
    //console.log(request.accountId);
    connection.query('select id, name from AddressBook where id=' + request.params.id + ' and accountId=' + request.accountId, function(error, result) {
        if (error) {
            console.log('error');
        }
        else if (result.length === 0) { // if the result contains nothing
            response.sendStatus(404); // tell the user that the result does not contain anything
            //response.status(404).send();
        }
        else {
            response.json(result[0]); //result is array so result at 1st position
        }
    });
});



var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});



// app.get('...
