var express = require('express');
const quizDb = require('./QuizDb.js');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  next();
});
// define the home page route
router.post('/', function (req, res) {
    quizDb.userDetails(req.user.uid,(result)=>{
     res.render("dashboard/confirm.hbs",{
     	email:req.user.uid,
     	full_name: result.full_name,
     	phone : result.mobile,
     	college: result.college_name,
     	quizid:req.body.quizid
     });  	
    });
  
});

module.exports = router;