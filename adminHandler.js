var express = require('express')
var router = express.Router();
var quizdb = require('./QuizDb.js');


router.post('/', function (req, res) {
  res.render("dashboard/Administration.hbs");
})

router.get("/",function(req,res){
   var email = req.user.uid;

   quizdb.getUserByEmail(email,(result)=>{
                  var userid = result;


                  quizdb.getQuizByUserId(userid,(result)=>{

                  	var quizes = result;
                  	res.render("dashboard/Administration.hbs",{
                  		quizes:quizes
                  	});

                  })
                  
                });


	
})


module.exports = router