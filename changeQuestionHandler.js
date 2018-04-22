var express = require('express')
var router = express.Router();
var quizdb = require('./QuizDb.js');

router.post('/', function (req, res) {
  console.log("dsdsada");
    var email = req.user.uid;
    var quizid = req.body.quizid;
    // var question = req.body.question;
    // var option1 = req.body.option1;
    // var option2 = req.body.option2;
    // var option3 = req.body.option3;
    // var option4 = req.body.option4;
    // var questionid = req.body.questionid;
    // var correct = req.body.correct;
    var questionid = req.body.questionid;
       var question=req.body.question;
       var option1=req.body.option1;
       var option2=req.body.option2;
       var option3=req.body.option3;
       var option4=req.body.option4;
        var correct = req.body.correct;
        console.log("correct  " + correct);
   data={question,option1,option2,option3,option4,correct};
    console.log(question,option1,option2,option3,option4);
    quizdb.UpdateQuestion(quizid,questionid,data,(result)=>{

                  console.log("result od "+ result);

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

})

module.exports = router