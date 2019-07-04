const express = require('express');
const router = express.Router();
const Member = require('../models/member');
var findOrCreate = require('mongoose-findorcreate');

//Register (Add member)
router.post('/register/submit', function(req, res, next) {

    var sendJson = { message: "" };

    Member.findOne({ name: req.body.name }, function(err, result) {

        if (result != null) {
            sendJson.message = "nameExist";
            console.log(sendJson);
            res.send(sendJson);
        } else {

            Member.findOne({ email: req.body.email }, function(err, result) {
                if (result != null) {
                    sendJson.message = "emailExist";
                    console.log(sendJson);
                    res.send(sendJson);
                } else {

                    Member.create(req.body).then(function(member) {
                        sendJson.message = "success";
                        console.log(sendJson);
                        res.send(sendJson);
                    }).catch(next);

                }
            });
        }
    });
});

//Login
router.post('/login', function(req, res, next) {

    var sendJson = { message: "" };

    Member.findOne({ name: req.body.name }, function(err, result) {

        if (result != null) {

            console.log("Password on DB: " + result.name + "      Input PW: " + req.body.password);
            
            if (req.body.password == result.name) {
                sendJson.message = "LoginSuccess";
                console.log(sendJson);
                res.send(sendJson);
            } else {
                sendJson.message = "LoginFailed";
                console.log(sendJson);
                res.send(sendJson);
            }
            
        } else {

        }
    });
});

//Update member
router.put('/member/update/:name', function(req, res, next) {
    Member.findByIdAndUpdate({ name: req.params.name }, req.body).then(function() {
        Member.findOne({ name: req.params.name }).then(function(member) {
            res.send(member);
        })
    })
});

//Delete member
router.delete('/member/delete/:name', function(req, res, next) {
    Member.findByIdAndRemove({ name: req.params.name }).then(function(member) {
        res.send(member);
    })
});

//Get member information
router.get('/member/:name', function(req, res, next) {
    res.send({ type: 'GET member' });
});


//Get stock symmary
router.get('/stock/summary', function(req, res, next) {

});

module.exports = router;