//Import Library
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set up express
const app = express();
const path = require('path');

//Connet to mongodb
mongoose.connect('mongodb+srv://ecom_admin:admin@ecom-member-vcel9.mongodb.net/ecom', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

//Define value
const PORT = process.env.PORT = 3000;

//Get html files
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : resolve to project folder.
});

app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname + '/signup.html'));
    //__dirname : resolve to project folder.
});

app.get('/stock', function(req, res) {
    res.sendFile(path.join(__dirname + '/stock-list.html'));
    //__dirname : resolve to project folder.
});

//Request handling
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

//Allow routers
app.use('/api', require('./routers/api'));


//Allow fily type access
app.use('/', express.static(__dirname + '/'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));

//Error handling
app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(422).send(err);
    //res.send({error: err.message});
})

//Listen to request
app.listen(PORT, () => {
    console.log('listening for requests')
})