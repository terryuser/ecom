const express = require('express');
const router = express.Router();
const Member = require('../models/member');

//Add member
router.post('/register/submit', function(req,res){
    Member.create(req.body).then(function(member){
        res.send(member);
    });
});

//Get member information
router.get('/member/:id', function(req,res){
    res.send({type: 'GET member'});
});

module.exports = router;