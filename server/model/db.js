var mongoose = require( 'mongoose' );

/*
Note:
To this test project as it is:
Start your MongoDB database.
Start mongo.exe and do:
  use testdb
  db.testusers.insert({userName : "Lars", email :"lam@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Henrik", email :"hsty@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Tobias", email :"tog@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Anders", email :"aka@cphbusiness.dk",pw: "test",created : new Date()})
*/


//This is set by the backend tests
var dbURI = 'mongodb://test:test@ds029831.mongolab.com:29831/firstdb';


mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  global.mongo_error = "Not Connected to the Database";
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});


/** User SCHEMA **/
/** Replace this Schema with your own(s) **/
var usersSchema = new mongoose.Schema({
  userName : String,
  email: {type: String, unique: true},
  pw: String,
  created: { type: Date, default: new Date() }
});


var wikiSchema = mongoose.Schema({
        title: { type: String, index: true},
        url: { type: String},
        abstract: { type: String},
        categories: {type: [{type: String}], index: true},
        links: {type: [{type: String}], index: true},
        headings: [{heading: {type: String}, position: {type: Number}}]},
    { collection: 'wiki' }
);



mongoose.model( 'User', usersSchema,"testusers" );
mongoose.model('wiki', wikiSchema);

