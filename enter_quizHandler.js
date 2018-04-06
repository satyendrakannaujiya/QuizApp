var express = require('express');
var router = express.Router();
var quizDb = require('./QuizDb.js');


router.post('/', function (req, res) {
   
   var quizid = req.body.quizid;
   var email = req.user.uid;
   console.log("within enterquiz " + "quizid " + quizid + "email " + email);
   quizDb.getPassword(quizid,(result)=>{
    console.log("password of quiz " + result);
    res.render('dashboard/quiz-auth.hbs',{
      email : email,
      password : result,
      quizid:quizid
    });
   })

});
module.exports = router;


