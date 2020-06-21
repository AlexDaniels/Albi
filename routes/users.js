var express = require('express');
var router = express.Router();

var sess = {
  secret: 'donot fuck with me dude',
  cookie: {}
}

/* GET users listing. */
router.post('/', function(req, res, next) {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/admin";

	//Setup Database
	MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
		if (err) throw err;
		//Create Database
	  	var dbo = db.db("peopleDB");
	  	//Create Collection
	  	
    	let person = {email:req.body.email,name:req.body.name,pitch:req.body.pitch,state:'new'}
	  	dbo.collection("people").insertOne(person, function(err, res) {
	    	if (err) throw err;
	    	db.close();
	  	});
	});

  res.send('respond with a resource');
});

module.exports = router;

