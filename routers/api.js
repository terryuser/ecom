const express = require('express');
const router = express.Router();
const Member = require('../models/member');

const path = require('path');


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

    var sendJson = { message: "", name: "" };

    Member.findOne({ name: req.body.name }, function(err, result) {

        if (result != null) {

            console.log("Password on DB: " + result.name + "      Input PW: " + req.body.password);

            if (req.body.password == result.name) {
                sendJson.name = result.name;
                sendJson.message = "LoginSuccess";
                console.log(sendJson);
                res.send(sendJson);
            } else {
                sendJson.message = "LoginFailed";
                console.log(sendJson);
                res.send(sendJson);
            }

        } else {
            console.log("request is null");
        }
    });
});


//Check stock is in watchlist
router.post('/watchlist/check', function(req, res, next) {
    console.log("checking watchlist: " + JSON.stringify(req.body));
    var user = req.body.name;
    Member.findOne({ name: user }, function(err, result) {
        console.log("result:" + result);
        if (result) {
            var respon = { message: "", stock: req.body.stock };
            if (result.watchlist.includes(req.body.stock)) {
                respon.message = "exist";
                console.log(respon.message);
                res.send(respon);
            } else {
                respon.message = "notExist";
                console.log(respon.message);
                res.send(respon);
            }
        }
    });
});


//Add stock into watchlist
router.put('/watchlist/update', function(req, res, next) {
    console.log(req.body);
    Member.findOne({ name: req.body.name }).then(function(member) {
        var sendJson = { message: "" };
        if (member.watchlist.includes(req.body.stock)) {
            sendJson.message = "exist";
            console.log(sendJson);
            res.send(sendJson);
        } else {
            var array = member.watchlist;
            array.push(req.body.stock);
            console.log("array = " + array);
            Member.findOneAndUpdate({ name: req.body.name }, { $set: { watchlist: array } }, { returnNewDocument: true }).then(function(result) {
                sendJson.message = "added";
                console.log(sendJson);
                res.send(sendJson);
            })
        }
    })
});

//Delete stock in watchlist
router.delete('/watchlist/delete', function(req, res, next) {
    Member.findOne({ name: req.body.name }).then(function(member) {
        var sendJson = { message: "" };
        if (member.watchlist.includes(req.body.stock)) {
            var array = member.watchlist;
            var index = array.indexOf(req.body.stock);
            console.log("array = " + array + ", index of result = " + index);
            array.splice(index, 1);
            console.log("after array = " + array);
            Member.findOneAndUpdate({ name: req.body.name }, { $set: { watchlist: array } }, { returnNewDocument: true }).then(function(result) {
                sendJson.message = "deleted";
                console.log(sendJson);
                res.send(sendJson);
            });
        } else {
            sendJson.message = "notExist";
            console.log(sendJson);
            res.send(sendJson);
        }
    })
});

//Get member information
router.post('/member/getInfo', function(req, res, next) {
    console.log("Getting info: " + JSON.stringify(req.body));
    Member.findOne({ name: req.body.name }).then(function(member) {
        console.log("Result = " + member);
        res.send(member);
    })
});

//Update member
router.put('/member/update/:name', function(req, res, next) {
    Member.findByIdAndUpdate({ name: req.params.name }, req.body).then(function() {
        Member.findOne({ name: req.params.name }).then(function(member) {
            console.log(member);
            res.send(member);
        })
    })
});

//Delete member
router.delete('/member/delete', function(req, res, next) {
    Member.findByIdAndRemove({ name: req.params.name }).then(function(member) {
        res.send(member);
    })
});



module.exports = router;