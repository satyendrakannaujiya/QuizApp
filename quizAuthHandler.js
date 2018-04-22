var express = require('express')
var router = express.Router()


router.post('/', function (req, res) {
  res.render("dashboard/update_profile.hbs");
})

router.get("/",function(req,res){
	console.log("within get of quiz auth quiz");
	res.render("dashboard/quiz-auth.hbs");
})


router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router