const express = require('express');
const router = express.Router();
const Member = require('../models/member');
var findOrCreate = require('mongoose-findorcreate');

//Add member
router.post('/register/submit', function(req, res, next){

    var requestName = req.body;
    console.log(requestName);

    var sendJson = { message: "" };

    Member.findOne({name: req.body.name}, function(err, result) {

        if (result != null) {
            sendJson.message = "nameExist";
            console.log(sendJson);
            res.send(sendJson);
        } else {

            Member.findOne({email: req.body.email}, function(err, result) {
                if (result != null) {
                    sendJson.message = "emailExist";
                    console.log(sendJson);
                    res.send(sendJson);
                } else {

                    Member.create(req.body).then(function (member) {
                        sendJson.message = "success";
                        console.log(sendJson);
                        res.send(sendJson);
                    }).catch(next);

                }
            });
        }
    });
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


//Get stock symmary
router.get('/stock/summary', function(req, res, next){
    
});

module.exports = router;