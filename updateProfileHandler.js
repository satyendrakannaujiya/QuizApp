var express = require('express')
const quizDb = require('./QuizDb.js')
var router = express.Router()

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.post('/', function (req, res) {
   var email = req.user.uid;
   var full_name = req.body.fullName;
   var college = req.body.collegeName;
   var mobile = req.body.mobile;
   quizDb.updateProfile(email,full_name,mobile,college,(result)=>{
      console.log("updated profile sucessfully");
        res.redirect("/dashboard.hbs");
   });
})

router.get("/",function(req,res){
    var email = req.user.uid;
     quizDb.userDetails(email,(result)=>{
     res.render("dashboard/update_profile.hbs",{
     	email:req.user.uid,
     	full_name: result.full_name,
     	phone : result.mobile,
     	college: result.college_name,
     	quizid:req.body.quizid,
     	
     });  	
    });

});


router.get('/about', function (req, res) {
  res.send('About birds')
});

module.exports = router;