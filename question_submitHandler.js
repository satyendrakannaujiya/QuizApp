// var setQuestion = require('./setQuestionHandler.js');
var express = require('express');
var router = express.Router();
var quizDb = require('./QuizDb.js');


var count =0;

router.post('/', function (req, res) {

     console.log("req.body.quizid" + req.body.quizid);
	
	console.log("req.body.no_of_question " + req.body.noofquestion);
     var no_of_question = req.body.noofquestion;
     var fixed = req.body.fixed;
    var question = req.body.question;
    var option1 = req.body.option1;
    var option2 = req.body.option2;
    var option3 = req.body.option3;
    var option4 = req.body.option4;
    var correct = req.body.correct;
    var quiz_id = req.body.quizid;
    var question_no = parseInt(fixed);

    var intFixed = parseInt(fixed)+1;

  var data = {question,option1,option2,option3,option4,correct,quiz_id,question_no};

   quizDb.saveQuestion(data,function(error,result){
   	  {

   	  	
   	  	res.render("dashboard/set-question.hbs",{
    		    quiz_id:req.body.quizid,
    		    no_of_question:req.body.noofquestion-1,
    		    fixed:intFixed	
    	});
                       
   }

});
});
module.exports = router;


