//Import Library
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();


//Set up express
const app = express();
const path = require('path');

//Connet to mongodb
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://ecom_admin:admin@ecom-member-vcel9.mongodb.net/ecom', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

//Define value
const PORT = process.env.PORT = 3000;

//Get html files
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
    //__dirname : resolve to project folder.
});

app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/register.html'));
    //__dirname : resolve to project folder.
});

app.get('/register/success', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/success.html'));
    //__dirname : resolve to project folder.
});

app.get('/watchlist', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/watchlist.html'));
    //__dirname : resolve to project folder.
});

app.get('/stocklist', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/stocklist.html'));
    //__dirname : resolve to project folder.
});

//Stock information
app.get('/stock', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/html/stock.html'));
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
app.use('/html', express.static(__dirname + '/html'));

//Error handling
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(422).send(err);
    //res.send({error: err.message});
})

//Listen to request
app.listen(PORT, () => {
    console.log('listening for requests')
})