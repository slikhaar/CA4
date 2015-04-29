var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = mongoose.model('User');

var wikiFacade = require("../model/wikiFacade")


/* GET A User From The DataBase */
router.get('/user', function(req, res) {
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
    return;
  }
  user.find({}, function (err, users) {
    if (err) {
      res.status(err.status || 400);
      res.end(JSON.stringify({error: err.toString()}));
      return;
    }
    res.header("Content-type","application/json");
    res.end(JSON.stringify(users));
  });
});

router.get('/getWiki/:title', function (req, res) {
    var title = req.params.title;
    wikiFacade.getWiki(title, function(err, data){
        if(err){
            throw err;
        }
        res.header("content-type", "application/JSON");
        res.send(JSON.stringify(data));
    })
});


router.get('/findWiki/:title', function (req, res) {
    var title = req.params.title;
    wikiFacade.findWiki(title, function(err, data){
        if(err){
            throw err;
        }
        res.header("content-type", "application/JSON");
        res.send(JSON.stringify(data));
    })
});



router.get('/getCategories', function (req, res) {
       wikiFacade.getCategories(function(err, data){
        if(err){
            throw err;
        }
        //console.log(data);
        res.header("content-type", "application/json");
        res.send(JSON.stringify(data));
    })
});


router.get('/getWikisWithCategory/:categories', function (req, res) {
    var categories = req.params.categories;
    wikiFacade.getWikisWithCategory(categories, function(err, data){
        if(err){
            throw err;
        }
        res.header("content-type", "application/JSON");
        res.send(JSON.stringify(data));
    })
});


module.exports = router;
