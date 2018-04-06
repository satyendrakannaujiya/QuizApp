var express = require('express');
var router = require('./routehandler.js');
var mysql = require('mysql');
var dbconnection = require('./QuizDb.js');
var createHandler = require('./createHandler.js');
var historyHandler = require('./quizHistoryHandler.js');
const start_quizHandler = require('./startquizHandler.js');
var updateProfileHandler = require('./updateProfileHandler.js');
const getResultHandler = require('./getResultHandler.js');
var adminHandler = require('./adminHandler.js');
var quizAuthhandler = require('./quizAuthHandler.js');
var setQuestionHandler = require('./setQuestionHandler.js');
var startHandler = require('./startHandler.js');
var confirmHandler = require('./confirmHandler.js');
const enter_quizHandler = require('./enter_quizHandler.js');
const signup_quizHandler = require('./signup_quizHandler.js');
var signupHandler = require('./signupHandler.js');
var question_submitHandler = require('./question_submitHandler');
var givequizHandler = require('./givequizHandler.js');
var hbs  = require('hbs');
var bodyParser = require('body-parser');
var Strategy = require('passport-local');
var passport = require('passport');

var app = express();
passport.use(new Strategy({
    usernameField:'uid',
    passwordField:'password'
  },
  function(uid, password, cb) {
    // password=sha(password);
    dbconnection.getUserById(uid, function(user) {
      // if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));


const loginFailure="/";
const loginRequired="/";

passport.serializeUser(function(user, cb) {
  cb(null, user.uid);
});

passport.deserializeUser(function(uid, cb) {
  dbconnection.getUserById(uid,(user)=>
  {
  	// console.log('in deserializeUser ',user);
    if(user===undefined){
      return cb("There was some error");
    }
    cb(undefined,user);
  });
});
// var routehandler = require('./routehandler.js');
// const session = require('express-session')
// const RedisStore = require('connect-redis')(session)


app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// app.use(session({
  
//   // secret: config.redisStore.secret,
//   resave: false,
//   saveUninitialized: false
// }))
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{


	res.render("home/index");
   
});

app.use('/create_quiz.hbs',require('connect-ensure-login').ensureLoggedIn(loginRequired),createHandler);

app.use('/quiz_history.hbs',require('connect-ensure-login').ensureLoggedIn(loginRequired),historyHandler);

app.use('/update_profile.hbs',require('connect-ensure-login').ensureLoggedIn(loginRequired),updateProfileHandler);

app.use('/Administration.hbs',require('connect-ensure-login').ensureLoggedIn(loginRequired),adminHandler);

app.use('/quiz-auth.hbs',require('connect-ensure-login').ensureLoggedIn(loginRequired),quizAuthhandler);

app.use('/set-question.hbs',require('connect-ensure-login').ensureLoggedIn(loginRequired),setQuestionHandler);

app.use('/start.hbs',require('connect-ensure-login').ensureLoggedIn(loginRequired),startHandler);

app.use('/confirm.hbs',require('connect-ensure-login').ensureLoggedIn(loginRequired),confirmHandler);

app.use('/signup',require('connect-ensure-login').ensureLoggedIn(loginRequired),signupHandler);
app.use('/question_submit',require('connect-ensure-login').ensureLoggedIn(loginRequired),question_submitHandler);
app.use('/signup_quiz',require('connect-ensure-login').ensureLoggedIn(loginRequired),signup_quizHandler);
app.use('/enter_quiz',require('connect-ensure-login').ensureLoggedIn(loginRequired),enter_quizHandler);
app.use('/startquiz',require('connect-ensure-login').ensureLoggedIn(loginRequired),start_quizHandler);

app.use('/givequiz',require('connect-ensure-login').ensureLoggedIn(loginRequired),givequizHandler);
app.use('/getResult',require('connect-ensure-login').ensureLoggedIn(loginRequired),getResultHandler);


app.post('/dashboard.hbs',  passport.authenticate('local',{ failureRedirect: loginFailure }),function (req, res) {
	
    console.log("request id " + req.user.uid);
    console.log("request id " + req.user.uid);
     var title,name,signedquiz;

   dbconnection.getCurrentUser(req.user.uid,(user_id)=>{

             
             dbconnection.getName(user_id,(result)=>{

                  var index = result[0].full_name.indexOf(' ');
                    if(index != -1)
                    {
                      name = result[0].full_name.slice(0,index);
                    }
                    else{
                      name = result[0].full_name;
                    }
                  

                  dbconnection.getQuizTitle(user_id,(result)=>{

                        signed = result;
                        dbconnection.getAllUnsignedQuiz(user_id,(result)=>{

                             unsignedquiz = result;
                             res.render("dashboard/dashboard.hbs",{
                                   name:name,
                                  signed:signed,
                                  unsignedquiz:unsignedquiz
                           });

                        })
                        

                  });

             });


    })



   });

app.get('/dashboard.hbs',require('connect-ensure-login').ensureLoggedIn(loginRequired),function (req, res) {
  

    console.log("request id " + req.user.uid);
     var title,name,signedquiz;

    dbconnection.getCurrentUser(req.user.uid,(user_id)=>{

             
             dbconnection.getName(user_id,(result)=>{

                  var index = result[0].full_name.indexOf(' ');
                  name = result[0].full_name.slice(0,index);

                  dbconnection.getQuizTitle(user_id,(result)=>{

                        signed = result;
                        dbconnection.getAllUnsignedQuiz(user_id,(result)=>{

                             unsignedquiz = result;
                             res.render("dashboard/dashboard.hbs",{
                                   name:name,
                                  signed:signed,
                                  unsignedquiz:unsignedquiz
                           });

                        })
                        

                  });

             });


    })

   });

app.get('/logout',(req,res)=>{

       req.logout();
       res.render("home/index.hbs");
})




  app.listen("3000",function(){
  	console.log("server is listening on port 3000");
  })