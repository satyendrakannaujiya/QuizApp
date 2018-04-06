var express = require('express')
var router = express.Router()
var quizDb = require('./QuizDb.js');
var data;

router.post('/', function (req, res) {

	// console.log("ewewewwew" + req.user.uid);
  var email = req.user.uid;
  var subject = req.body.subject;
  var title = req.body.title;
  var no_of_question = req.body.no_of_question;

  var date = req.body.start_date;
  var quiz_duration = req.body.quiz_duration;

  
  var password = req.body.password;

  //console.log("date  in handler " + date);

  quizDb.getUserByEmail(email,function(result){

      var user_id = result;
      console.log("dasdasdsdsd " + result);
      quizDb.getUniqId(function(error,result){

             quiz_id = "quiz" + result;
            var data = {quiz_id,user_id,subject,title,no_of_question,date,quiz_duration,password};
           
           quizDb.saveQuiz(data,function(result){

               console.log("Info saved sucessfully" + result);
             res.render("dashboard/set-question.hbs",{
              no_of_question : no_of_question,
              quiz_id : quiz_id,
              fixed : 1
             });

            });           
  
           })
      
      
            

  })

  
  
   
  
 
})

router.get("/",function(req,res){
	console.log("within get of setquestion quiz");
	res.render("dashboard/set-question.hbs");
})




module.exports = router;
