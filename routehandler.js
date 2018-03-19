var express = require('express')
var router = express.Router()
var dbconnection = require('./QuizDb.js');
var CircularJSON = require('circular-json');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.post('/', function (req, res) {
	//var x = new dbconnection();

	console.log("within post");
	var x = dbconnection.getUserName();

	   // console.log("all object" +Object.getOwnPropertyNames(x));
	// console.log("name "+JSON.stringify(x));

	console.log("xxx" + x);

	// console.log("fullname "+ x.full_name);
  res.render("dashboard/dashboard.hbs");
})

router.get("/",function(req,res){
	//var x = new dbconnection();

   
	console.log("within get");

	var x = dbconnection.getUserName();
	console.log("name "+x);

	res.render("dashboard/dashboard.hbs");
})


router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router