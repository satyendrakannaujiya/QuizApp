var express = require('express')
var router = express.Router();
var quizdb = require('./QuizDb.js');

router.post('/', function (req, res) {
    var email = req.user.uid;
    var quizid = req.body.quizid;
     quizdb.getAllQuestion(quizid,(result)=>{
                 var noofquestion = result;
                 

           //currentquestion = questionsWithStatus[0];
                quizdb.getQuizDuration(quizid,(duration)=>{

                 
                res.render('dashboard/editQuiz.hbs',{

                 quizid : quizid,
                 email : email,
                 questions : noofquestion,
                 duration:duration
                

                });

                })
        

        

         })

  
})




module.exports = router