const express = require('express');
const router = express.Router();
const Member = require('../models/member');

//Add member
router.post('/register/submit', function(req, res, next){
    Member.create(req.body).then(function(member){
        res.send(member);
    }).catch(next);
});

//Update member
router.put('/member/update/:id', function(req, res, next){
    Member.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
        Member.findOne({_id:req.params.id}).then(function(member){
            res.send(member);
        })
    })
});

//Delete member
router.delete('/member/delete/:id', function(req, res, next){
    Member.findByIdAndRemove({_id:req.params.id}).then(function(member){
        res.send(member);
    })
});

//Get member information
router.get('/member/:id', function(req, res, next){
    res.send({type: 'GET member'});
});

module.exports = router;