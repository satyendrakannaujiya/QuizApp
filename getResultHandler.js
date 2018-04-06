var express = require('express');
const quizDb = require('./QuizDb.js');
var router = express.Router();

router.post('/', function (req, res) {
   var quizId= req.body.quizid;

   console.log("within getresult handler" + quizId);
   var correctAnswer = req.body.correctanswer;

   console.log("correctanswer " + correctAnswer);
   var noOfAttempted = req.body.attempted;

   quizDb.getNoOfQuestion(quizId,(result)=>{

            noofquestion=result;

            res.render('dashboard/result.hbs',{

            	 noofquestion:noofquestion,
            	 noOfAttempted:noOfAttempted,
            	 correctanswer:correctAnswer
            	 
            });

   })
   
  
});

module.exports = router;