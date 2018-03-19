var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.post('/', function (req, res) {
  res.render("dashboard/update_profile.hbs");
})

router.get("/",function(req,res){
	console.log("within get of confirm quiz");
	res.render("dashboard/confirm.hbs");
})


router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router