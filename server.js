//Import Library
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const memberapi = require('./routers/api');

//Set up express
const app = express();
const router = express.Router();

// //Connet to mongodb
// mongoose.connect('mongodb+srv://ecom_admin:admin@ecom-member-vcel9.mongodb.net/test?retryWrites=true&w=majority');
// mongoose.Promise = global.Promise;


app.use(express.json());
app.use(function(error, req, res, next) {
    //Catch json error
    sendError(res, myCustomErrorMessage);
});


//initalize routes
app.use('/api', memberapi);


const PORT = process.env.PORT = 3000;

console.log(__dirname);

//API location - href to html pages
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});

app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname + '/signup.html'));
    //__dirname : It will resolve to your project folder.
});

app.get('/stock/:stockid', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});




//Allow fily type access
app.use('/', express.static(__dirname + '/'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));

//Listen for requests
app.use('/', router);
app.listen(PORT, () => {
    console.log('listening for requests')
})