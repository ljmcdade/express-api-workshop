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



//CREATE Address, Email, Phone

app.post('/Address/:id', function(request, response) {

    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Address on Entry.id = Address.entryId where Address.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {
                connection.query("insert into Address set entryId=" + request.body.entryId + ', type="' + request.body.type + '" , line1= " ' +
                    request.body.line1 + '" , line2="' +
                    request.body.line2 + '" , city="' +
                    request.body.city + '" , state="' +
                    request.body.state + '" , zip="' +
                    request.body.zip + '" , country="' +
                    request.body.country + '"',
                    function(error, result) {
                        if (error) {
                            console.log(error);
                            response.sendStatus(404);
                        }
                        else {
                            console.log(result.insertId);
                            connection.query("select * from Address where id=" + result.insertId, function(error, result) {
                                response.json(result[0]);
                            });
                        }
                    });
            }
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});

app.post('/Email/:id', function(request, response) {

    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Email on Entry.id = Email.entryId where Email.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {
                connection.query("insert into Email set entryId=" +
                    request.body.entryId + ', type="' +
                    request.body.type + '", address="' +
                    request.body.address + '"',
                    function(error, result) {
                        if (error) {
                            console.log(error);
                            response.sendStatus(404);
                        }
                        else {
                            console.log(result.insertId);
                            connection.query("select * from Email where id=" + result.insertId, function(error, result) {
                                response.json(result[0]);
                            });
                        }

                    });
            }
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});


app.post('/Phone/:id', function(request, response) {
    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Phone on Entry.id = Phone.entryId where Phone.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {
                connection.query("insert into Phone set entryId=" +
                    request.body.entryId + ', type="' +
                    request.body.type + '", subtype="' +
                    request.body.subtype + '", phoneNumber=' +
                    request.body.phoneNumber + '',
                    function(error, result) {
                        if (error) {
                            console.log(error);
                            response.sendStatus(404);
                        }
                        else {
                            console.log(result.insertId);

                            connection.query("select * from Phone where id=" + result.insertId, function(error, result) {
                                response.json(result[0]);
                            });
                        }
                    });
            }
            else {
                response.send("Not your account!");
            }
        }
        response.json(result);
    });
});

// READ Address, Email, Phone

app.get('/Address/:id', function(request, response) {

    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Address on Entry.id = Address.entryId where Address.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {

                connection.query("select * from Address where id=" + request.params.id + '', function(error, result) {
                    if (error) {
                        console.log(error);
                    }
                    else if (result.length === 0) {
                        response.sendStatus(404);
                    }
                    else {
                        response.json(result[0]);
                    }
                });
            }
            else {
                response.send("Not your account!");
            }
        }
        response.json(result);
    });
});

app.get('/Email/:id', function(request, response) {

    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Email on Entry.id = Email.entryId where Email.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {

                connection.query("select * from Email where id=" + request.params.id + '', function(error, result) {
                    if (error) {
                        console.log(error);
                    }
                    else if (result.length === 0) {
                        response.sendStatus(404);
                    }
                    else {
                        response.json(result[0]);
                    }
                });
            }
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});

app.get('/Phone/:id', function(request, response) {

    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Phone on Entry.id = Phone.entryId where Phone.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {

                connection.query("select * from Phone where id=" + request.params.id + '', function(error, result) {
                    if (error) {
                        console.log(error);
                    }
                    else if (result.length === 0) {
                        response.sendStatus(404);
                    }
                    else {
                        response.json(result[0]);
                    }
                });
            }
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});


//UPDATE Address, Email, Phone


app.put('/Address/:id', function(request, response) {
    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Address on Entry.id = Address.entryId where Address.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {
                connection.query("update Address set entryId=" + request.body.entryId + ', type="' + request.body.type + '" , line1= " ' +
                    request.body.line1 + '" , line2="' +
                    request.body.line2 + '" , city="' +
                    request.body.city + '" , state="' +
                    request.body.state + '" , zip="' +
                    request.body.zip + '" , country="' +
                    request.body.country + '"',
                    function(error, result) {
                        if (error) {
                            console.log(error);
                            response.sendStatus(404);
                        }
                        else {
                            console.log(result.insertId);
                            connection.query("select * from Address where id=" + result.insertId, function(error, result) {
                                response.json(result[0]);
                            });
                        }
                    });
            }
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});

app.put('/Email/:id', function(request, response) {
    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Email on Entry.id = Email.entryId where Email.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {
                connection.query("update Email set entryId=" +
                    request.body.entryId + ', type="' +
                    request.body.type + '", address="' +
                    request.body.address + "",
                    function(error, result) {
                        if (error) {
                            console.log(error);
                            response.sendStatus(404);
                        }
                        else {
                            console.log(result.insertId);
                            connection.query("select * from Email where id=" + result.insertId, function(error, result) {
                                response.json(result[0]);
                            });
                        }
                    });
            }
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});


app.put('/Phone/:id', function(request, response) {
    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Phone on Entry.id = Phone.entryId where Phone.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {
                
                connection.query("update Phone set entryId=" +
                    request.body.entryId + ', type="' +
                    request.body.type + '", subtype="' +
                    request.body.subtype + '", phoneNumber="' +
                    request.body.phoneNumber + "",
                    function(error, result) {
                        if (error) {
                            console.log(error);
                            response.sendStatus(404);
                        }
                        else {

                            console.log(result.insertId);

                            connection.query("select * from Phone where id=" + result.insertId, function(error, result) {
                                response.json(result[0]);
                            });
                        }
                    });
            }
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});

//DELETE Address, Email, Phone

app.delete('/Address/:id', function(request, response) {
    
    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Address on Entry.id = Address.entryId where Address.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {
                if (request.body.entryId) {
                    
                    connection.query("delete from Address where Address.id=" + request.params.id, function(error, result) {
                        if (error) {
                            console.log(error);
                            response.sendStatus(404);
                        }
                        else {
                            console.log(result);
                        }
                    });
                }
            }
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});

app.delete('/Email/:id', function(request, response) {
    
    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Email on Entry.id = Email.entryId where Email.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {

                connection.query("delete from Email where Email.id=" + request.params.id, function(error, result) {
                    if (error) {
                        console.log(error);
                        response.sendStatus(404);
                    }
                    else {
                        console.log(result);
                    }
                });
            }
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});


app.delete('/Phone/:id', function(request, response) {

    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id = Entry.addressbookId JOIN Phone on Entry.id = Phone.entryId where Phone.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {
                
                connection.query("delete from Phone where id=" + request.params.id, function(error, result) {
                    if (error) {
                        console.log(error);
                        response.sendStatus(404);
                    }
                    else {
                        console.log(result);
                        response.json(result);
                    }
                });

            }
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});


//Entry CREATE

app.post('/Entry/:id', function(request, response) {

    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id=Entry.addressbookId where Entry.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) { //check if that entry exist

            if (result[0].accountId === request.accountId) { //check if that entry belongs the user's account

                //response.send("ok");            
                connection.query("insert into Entry set firstName='" + request.body.firstName +
                    " ', lastName='" + request.body.lastName +
                    " ', birthday=' " + request.body.birthday +
                    " 'where addressbookId= " + request.body.addressbookId +
                    " and id=" + request.params.id + "",
                    function(error, result) {
                        //console.log("result 1", result);
                        if (error) {
                            console.log(error);
                            response.sendStatus(404);
                        }
                        else {
                            connection.query("select * from Entry where id=" + request.params.id, function(error, result) {
                                //console.log("result 2", result);
                                response.json(result[result.length - 1]);
                            });
                        }
                    });

            }

            else {
                response.send("not yours");
            }
        }

        else {
            response.json(result);
        }


    });


});

//Entry READ

app.get('/Entry/:id', function(request, response) {

    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id=Entry.addressbookId where Entry.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) { //check if that entry exist

            if (result[0].accountId === request.accountId) { //check if that entry belongs the user's account

                //response.send("ok");            
                connection.query("select * from Entry where id=" + request.params.id + "",
                    function(error, result) {
                        //console.log("result 1", result);
                        if (error) {
                            console.log(error);
                            response.sendStatus(404);
                        }
                        else {
                            connection.query("select * from Entry where id=" + request.params.id, function(error, result) {
                                //console.log("result 2", result);
                                response.json(result[result.length - 1]);
                            });
                        }
                    });

            }

            else {
                response.send("This account doesn't belong to you!");
            }
        }

        else {
            response.json(result);
        }


    });


});


//Entry UPDATE

app.put('/Entry/:id', function(request, response) {

    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id=Entry.addressbookId where Entry.id=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) { //check if that entry exist

            if (result[0].accountId === request.accountId) { //check if that entry belongs the user's account

                //response.send("ok");            
                connection.query("update Entry set firstName='" + request.body.firstName +
                    " ', lastName='" + request.body.lastName +
                    " ', birthday=' " + request.body.birthday +
                    " 'where addressbookId= " + request.body.addressbookId +
                    " and id=" + request.params.id + "",
                    function(error, result) {
                        //console.log("result 1", result);
                        if (error) {
                            console.log(error);
                            response.sendStatus(404);
                        }
                        else {
                            connection.query("select * from Entry where id=" + request.params.id, function(error, result) {
                                //console.log("result 2", result);
                                response.json(result[result.length - 1]);
                            });
                        }
                    });

            }

            else {
                response.send("This account doesn't belong to you!");
            }
        }

        else {
            response.json(result);
        }


    });


});

//Entry DELETE

app.delete('/Entry/:id', function(request, response) {
    connection.query("select AddressBook.accountId from AddressBook JOIN Entry on AddressBook.id=Entry.addressbookId JOIN Address on Address.entryId=Entry.id where EntryId=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {
                
                connection.query("delete from Entry where id=" + request.params.id, function(error, result) {
                    if (error) {
                        console.log(error);
                        response.sendStatus(404);
                    }
                    else {
                        console.log(result);
                        response.json(result);
                    }
                });
            }

            else {
                response.send("This account doesn't belong to you!");
            }
        }
        else {
            response.json(result);

        }
    });
});


//AddressBook CREATE

app.post('/AddressBook/:id', function(request, response) {

    connection.query("select accountId from AddressBook where accountId=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) {
            if (result[0].accountId === request.accountId) {

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
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});




//AddressBook READ

app.get('/AddressBook/:id', function(request, response) { // close js string open variable  
    //console.log(request.accountId);
    connection.query("select accountId from AddressBook where accountId=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) { //if result exists
            if (result[0].accountId === request.accountId) { //if user allowed
            
                connection.query('select * from AddressBook where id=' + request.params.id + ' and accountId=' + request.accountId, function(error, result) {
                    if (error) {
                        console.log(error);
                    }
                    else if (result.length === 0) { // if the result contains nothing
                        response.sendStatus(404); // tell the user that the result does not contain anything
                        //response.status(404).send();
                    }
                    else {
                        response.json(result[0]); //result is array so result at 1st position
                    }
                });
            }

            else {
                response.send("This isn't your account!");
            }
        }

        else {
            response.json(result);
        }
    });
});



//AddressBook UPDATE

app.put('/AddressBook/:id', function(request, response) {
    connection.query("select accountId from AddressBook where accountId=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) { //if result exists
            if (result[0].accountId === request.accountId) { //if user allowed
            
                connection.query("update AddressBook set name='" + request.body.name + "'where AddressBook.id=" + request.params.id, function(error, result) {
                    //console.log(request.body);
                    if (error) {
                        response.sendStatus(404);
                    }
                    else {
                        
                        connection.query("select * from AddressBook where AddressBook.id=" + request.params.id, function(error, result) {
                            console.log(result);
                            response.json(result);
                        });
                    }

                });
            }
            else {
                response.send("Not your account!");
            }
        }
        response.json(result);
    });
});


//AddressBook DELETE


app.delete('/AddressBook/:id', function(request, response) {
    
    connection.query("select accountId from AddressBook where accountId=" + request.params.id, function(error, result) {
        if (error) {
            console.log(error);
            response.sendStatus(404);
        }
        else if (result.length === 1) { //if result exists
            if (result[0].accountId === request.accountId) {

                //if (request.body.accountId) {
                connection.query("delete from AddressBook where AddressBook.id=" + request.params.id + "and AddressBook.accountId = " + request.accountId, function(error, result) {
                    if (error) {
                        //console.log(error);
                        response.sendStatus(404);
                    }
                    else {
                        console.log(result);
                    }
                });
            }
            else {
                response.send("Not your account!");
            }
        }
        else {
            response.json(result);
        }
    });
});









var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
