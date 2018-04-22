
var QuizDb = require('./QuizDb.js');
var express = require('express');
const quizDb = require('./QuizDb.js');
var router = express.Router();


router.post('/', function (req, res) {

  console.log("save result handler");
   
    var email=req.user.uid;
    var quiz_id=req.body.quiz_id;
    var no_of_question=req.body.no_of_question;
    var correct=req.body.correct;
    var attempted = req.body.attempted;

    console.log(email+" "+ quiz_id + " " + no_of_question + " " + correct);
     var data = {email,quiz_id,no_of_question,correct};
   // quizDb.saveResult(data,(result)=>{


            quizDb.getCurrentUser(email,(result)=>{


                var userid=result;

                quizDb.getQuizTitleForResult(quiz_id,(result)=>{

                 var quiz_title = result;
                  var data = {quiz_title,userid,quiz_id,no_of_question,correct,attempted};
                    quizDb.saveResult(data,(result)=>{
                   quizDb.updateQuiz(userid,quiz_id,(result)=>{

                 console.log("result saved sucesfully");
                res.redirect('/dashboard.hbs');
           })


            })

                })
             
              

    });
           
    	    
   // })

  
});

module.exports = router;