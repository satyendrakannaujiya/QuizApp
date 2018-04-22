var express = require('express')
var router = express.Router()
var quizdb = require('./QuizDb.js');
router.post('/', function (req, res) {
	
  res.render("dashboard/create_quiz.hbs");
})

router.get("/",function(req,res){

	var email = req.user.uid;

	quizdb.getUserByEmail(email,(result)=>{
                  var userid = result;

                  
                  quizdb.getResultByUserId(userid,(result)=>{

                  	var quizes = result;

                  	res.render("dashboard/viewresult.hbs",{
                  		quizes:quizes
                  	});

                  })
                  
                });
	
})



module.exports = router