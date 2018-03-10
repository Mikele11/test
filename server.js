var express = require('express');
var app = express();
var mongojs = require('mongojs');
//var db = mongojs('chat', ['chat']);
const MongoClient = require('mongodb').MongoClient;

const MONGO_URL = 'mongodb://Mikele11:face112358@ds153413.mlab.com:53413/bookday';

MongoClient.connect(MONGO_URL, function(err, db){  
  if (err) {
    return console.log(err);
  }
	//var db = client.db('mytestingdb');  
	app.get('/chat', function (req, res) {
	    console.log('All right');
		db.collection("chat").find({}).toArray(function(error, doc) {
			if (err) throw error;
			console.log('+++++++');
			console.log(doc);
			console.log('+++++++');
			res.send(doc);
			//db.close();
		});
	});
	/*
	app.get('/', function (req, res) {
		return res.redirect('/chat');//'/app'
	});
	*/
	  /*
	  db.collection("bookday").find(function (err, docs) {
		console.log(docs);
		res.json(docs);
		*/

	app.post('/chat', function (req, res) {
	  console.log(req.body);
	  db.collection("chat").insertOne(req.body, function(err, doc) {
		if (err) throw err;
		res.json(doc);
		//db.close();
	  });
	});
	
	app.delete('/chat/:id', function (req, res) {
	  var id = req.params.id;
	  console.log(id);
	  db.collection("chat").remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
		//db.close();
	  });
	});
		
});


var bodyParser = require('body-parser');
//---------------------------------------------swagger
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//---------------------------------------------
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
/*
app.get('/chat', function (req, res) {
  console.log('All right');
  db.collection("bookday").find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  })
});

app.post('/chat', function (req, res) {
  console.log(req.body);
  db.collection("bookday").insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/chat/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.collection("bookday").remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
*/
/*
app.get('/chat/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.chat.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
*/
const port = process.env.PORT || 3000;
app.listen(port);
console.log("Server running on port 3000");
