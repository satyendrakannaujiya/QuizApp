

var express = require('express')
var router = express.Router()
var QuizDb = require('./QuizDb.js');

router.post('/', function (req, res) {
   var fullname = req.body.fullname;
   var email = req.body.email;
   var mobile = req.body.mobile;
   var password = req.body.password;
   var confirmpassword = req.body.confirmpassword;
   var college =  req.body.college;
   var profession =  req.body.profession;
   var data = {fullname,email,mobile,password,college,profession};
   QuizDb.addUser(data,(result)=>{
        res.render("home/index.hbs");
   });
});

module.exports = router;