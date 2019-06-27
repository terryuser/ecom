//Import Library
const express = require('express');
const Member = require('../models/member');

//Set up express
const router = express.Router();


//create member to db
router.get('/reg', function(req, res) {
    console.log('Server got data for sign up member');
    res.send({ type: 'GET' });
});

//create member to db
router.post('/signupsubmit', function(req, res) {
    // Member.create(req.body).then(function(member) {
    //     res.send(member);
    // });
    console.log(req.body);
    res.send({ type: 'POST' });
});

//update member to db
router.put('/update/:id', function(req, res) {
    res.send({ type: 'PUT' });
});

//delete data from db
router.delete('/delete/:id', function(req, res) {
    res.send({ type: 'DELETE' });
});

module.exports = router;