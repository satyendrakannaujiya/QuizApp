var express = require('express')
var router = express.Router()



router.get("/",function(req,res){
	console.log("within get of create quiz");
	var quizid = req.body.quizid;
	res.render("dashboard/selectfile.hbs",{
		quizid:quizid
	});
})



module.exports = router