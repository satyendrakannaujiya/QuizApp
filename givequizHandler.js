var express = require('express');
const quizDb = require('./QuizDb.js');
var router = express.Router();


router.post('/', function (req, res) {
	

         var email = req.user.uid;
         var quizid = req.body.quizid;

         quizDb.getAllQuestion(quizid,(result)=>{
                 var noofquestion = result;
                 

           // currentquestion = questionsWithStatus[0];
                quizDb.getQuizDuration(quizid,(duration)=>{

                res.render('dashboard/givequiz.hbs',{

                 quizid : quizid,
                 email : email,
                 questions : noofquestion,
                 duration:duration
                

                });

                })
        

        

         })
      
  
})



module.exports = router