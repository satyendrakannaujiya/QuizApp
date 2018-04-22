var express = require('express');
const quizDb = require('./QuizDb.js');
var router = express.Router();


router.post('/', function (req, res) {
	

         var email = req.user.uid;
         var quizid = req.body.quizid;

         quizDb.getAllQuestion(quizid,(result)=>{
                 var noofquestion = result;
                 var  questionsWithStatus = noofquestion.map(question=>{
                         return {
                              question,
                              activeClass:"active"
                         }
                 });

           currentquestion = questionsWithStatus[0];
                quizDb.getQuizDuration(quizid,(duration)=>{

                res.render('dashboard/practice.hbs',{

                 quizid : quizid,
                 email : email,
                 questions : noofquestion,
                 duration:duration,
                 questionsWithStatus:questionsWithStatus,
                 currentquestion:currentquestion

                });

                })
        

        

         })
      
  
})



module.exports = router