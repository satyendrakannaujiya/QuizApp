var express = require('express');
var router = express.Router();
var dbconnection = require('./QuizDb.js');

router.get('/', function (req, res) {

   var name,title,signedquiz;
         dbconnection.getName((result)=>{

                
                var index = result[0].full_name.indexOf(' ');
                  name = result[0].full_name.slice(0,index);
         dbconnection.getQuizTitle((result)=>{

              
               title = result;


              dbconnection.getAllUnsignedQuiz((result)=>{

              
               signedquiz = result;
              res.render("dashboard/dashboard.hbs",{
                  name:name,
                  title:title,
                  signedquiz:signedquiz
              });

          });
          });
         });  

   });





module.exports = {
  router
}