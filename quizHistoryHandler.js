var express = require('express')
var router = express.Router()
var quizdb = require('./QuizDb.js');

router.get("/",function(req,res){
	console.log("within get of create quiz");


      var email = req.user.uid;

      quizdb.getUserByEmail(email,(result)=>{
                  var userid = result;
                  
                  quizdb.getQuizHistory(userid,(result)=>{

                            var quizhistory=result;

                        res.render("dashboard/quiz_history.hbs",{
                                       quizhistory:quizhistory
                               });
                  })

              

            // quizdb.getQuizHistory(userid,(result)=>{

            // 	console.log("length " + result.length);

            // 	result.forEach((element,index,array)=>{

            // 		console.log(element);

            // 		console.log("quiz_id  " + element.quiz_id);
                      
            //           quizdb.getQuizDetailsById(element.quiz_id,(result)=>{

            //           	console.log("result  quiz details  " + result);

            //           	    quizhistory.push(result);
            //           	    counter++;
            //           	    if(counter == array.length)
            //           	    {
            //           	    	 console.log("quizhistory " + quizhistory);
            //           	    	 res.render("dashboard/quiz_history.hbs",{
           	//                           quizhistory:quizhistory
            //                   });


            //           	    }
            //           })

            // 	})

            	

                        
           


           // })   
      })
	
})


module.exports = router