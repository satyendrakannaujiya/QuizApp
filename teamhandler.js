var express = require('express')
var router = express.Router()


router.post('/', function (req, res) {
	
  res.render("dashboard/create_quiz.hbs");
})

router.get("/",function(req,res){
	console.log("within get of create quiz");
	res.render("dashboard/team.hbs");
})



module.exports = router