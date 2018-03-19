

var express = require('express');

var router = require('./routehandler.js');
var mysql = require('mysql'); 
var dbconnection = require('./QuizDb.js');

var createHandler = require('./createHandler.js');
var historyHandler = require('./quizHistoryHandler.js');
var updateProfileHandler = require('./updateProfileHandler.js');
var adminHandler = require('./adminHandler.js');
var quizAuthhandler = require('./quizAuthHandler.js');
var setQuestionHandler = require('./setQuestionHandler.js');
var startHandler = require('./startHandler.js');
var confirmHandler = require('./confirmHandler.js');
var hbs  = require('hbs');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{

	


	res.render("home/index");


	
})
app.use('/dashboard.hbs', router);

app.use('/create_quiz.hbs',createHandler);

app.use('/quiz_history.hbs',historyHandler);

app.use('/update_profile.hbs',updateProfileHandler);

app.use('/Administration.hbs',adminHandler);

app.use('/quiz-auth.hbs',quizAuthhandler);

app.use('/set-question.hbs',setQuestionHandler);

app.use('/start.hbs',startHandler);

app.use('/confirm.hbs',confirmHandler);


  app.listen("3000",function(){
  	console.log("server is listening on port 3000");
  })