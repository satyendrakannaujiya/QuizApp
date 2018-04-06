var express = require('express');
var router = express.Router();
var quizDb = require('./QuizDb.js');


router.post('/', function (req, res) {
   
   var quizid = req.body.quizid;
   var email = req.user.uid;

   console.log("within signuphandler");


   quizDb.getUserByEmail(email,(result)=>{

            var user_id = result;
            console.log("quizid " + quizid + "userid " + user_id);
            quizDb.signupQuiz(quizid,user_id,(result)=>{
             console.log(result);
             
             res.redirect('/dashboard.hbs');

            });

   })
    
});
module.exports = router;


