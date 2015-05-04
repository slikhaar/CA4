global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var url = "http://localhost:"+testPort;
var testServer;
var mongoose = require("mongoose");
var User = mongoose.model("User");
var wiki = mongoose.model("wiki");
var request = require("request");

describe('REST API for /user', function () {
    //Start the Server before the TESTS
    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    })

    beforeEach(function (done) {

        //    User.create(array, function (err) {
        //        done();


        wiki.remove({}, function () {
            var array = [{
                title: "Småkager",
                url: "https://småkager.dk",
                abstract: "Her er opskriften på småkager: 1. Tag en masse usunde sager. 2. Bland dem i en skål. 3. Bag dem på 200 grader.",
                categories: "Kage",
                links: "http://en.wikipedia.org/wiki/Kager",
                headings: [{}],
                collection: [{}]
            }];
            User.create(array, function (err) {
                console.log("hej");
                done();
            })
        });
    })
        after(function () {  //Stop server after the test
            //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
            //mongoose.connection.db.dropDatabase();
            testServer.close();
        })

        it("Should get 1 complete object with that title or undefined", function (done) {
            request({method: 'GET', uri: url+"/api/getWiki/Java", json: true}, function (err, res, body) {
                if(err) throw err;
                console.log("nej");
                body[0].title.should.equal("Småkager");
                done();
                });
            })


})


