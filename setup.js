var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/admin";

//Setup Database
MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
	if (err) throw err;
	//Create Database
  	var dbo = db.db("peopleDB");
  	console.log("DB created!");
  	//Create Collection
  	dbo.createCollection("people", function(err, res) {
    	if (err) throw err;
    	console.log("Collection created!");
    	let me = {email:'contact@albi.media',name:'Alex Daniels',pitch:'To Start This Fucking Company',state:'new'}
	  	dbo.collection("people").insertOne(me, function(err, res) {
	    	if (err) throw err;
	    	console.log("1 document inserted");
	    	db.close();
	  	});
  	});
});