var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.post('/', function (req, res) {
	
  res.render("dashboard/create_quiz.hbs");
})

router.get("/",function(req,res){
	console.log("within get of create quiz");
	res.render("dashboard/create_quiz.hbs");
})


router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router