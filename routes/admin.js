var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(process.cwd() + '/public/admin.html'))
});

router.post('/verify', function(req,res,next) {
	let secret = '100247245'
	
	if (req.body.secret === secret) {
		res.send(true);
	} else {
		res.send(false);
	}
})

router.get('/getpeople', function(req,res,next) {
	//Get People from DB

	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/admin";

	MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
		if (err) throw err;
	
	  	var dbo = db.db("peopleDB");
	  	
	  	dbo.collection('people').find({}, {}).toArray(function(err, docs) {
	        res.status(200).json(docs.reverse());
	        db.close();
	    });

	});
})

router.post('/good', function(req,res,next) {
	var MongoClient = require('mongodb').MongoClient;
	var { ObjectId } = require('mongodb');
	var url = "mongodb://localhost:27017/admin";
	let id = ObjectId(req.body.id);
	MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
		if (err) throw err;
	  	var dbo = db.db("peopleDB");
	   	dbo.collection('people').updateOne(
	      { "_id" : id },
	      { $set: { "state" : 'good' } }
	   	);
	   	res.sendStatus(200)
	});
})

router.post('/bad', function(req,res,next) {
	var MongoClient = require('mongodb').MongoClient;
	var { ObjectId } = require('mongodb');
	var url = "mongodb://localhost:27017/admin";
	let id = ObjectId(req.body.id);
	MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
		if (err) throw err;
	  	var dbo = db.db("peopleDB");
	   	dbo.collection('people').updateOne(
	      { "_id" : id },
	      { $set: { "state" : 'bad' } }
	   	);
	   	res.sendStatus(200)
	});
})

module.exports = router;