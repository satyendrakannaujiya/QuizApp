var express = require('express');
const quizDb = require('./QuizDb.js');
var router = express.Router();

router.post('/', function (req, res) {
    console.log("within start handler ");  
    var quizid = req.body.quizid;
    res.render('dashboard/start.hbs',{
     quizid:quizid        
    });
});



module.exports = router;