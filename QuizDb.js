var mysql  = require('mysql'); 
var dbconnection = require('./dbConnection.js');

exports.getName = function(user_id,callback){
 dbconnection.getResult(`SELECT full_name from users where user_id=\'${user_id}\'`,function(error,result){
             if(!error)
              callback(result);
             else
             	console.log("error in get result");
 });
}
exports.getQuizTitle = function(user_id,callback){
       dbconnection.getResult(`select * from quiz where user_id='${user_id}' and quiz_status=1 `,function(error,result){

             if(!error)
             {
                   console.log("title " + result)
                   callback(result);
             }else{
             	console.log("error in get result");
             }
 });
}
exports.getAllUnsignedQuiz = function(user_id,callback){
	   dbconnection.getResult(`select * from quiz where quiz_status=0;`
                           ,function(error,result){
	   	                     if(!error)
	   	      	             callback(result);
                          else
	   	      	             console.log("error in get all unsigned user");
	                       });
}

exports.saveQuiz = (data,callback)=>{

  var new_id;
  dbconnection.getResult('select id from UniqId',(error,result)=>{
    new_id=result[0].id+1;
    var xx= new_id+1;
    dbconnection.getResult(`update UniqId set id= ${xx}`,(error,result)=>{
        dbconnection.getResult(`insert into quiz values('${data.user_id}','${data.quiz_id}','${data.subject}','${data.title}','${data.no_of_question}'
            ,'${data.quiz_duration}','${data.date}','${data.password}',0);`,function(error,result){
                  if(!error)
                    callback(result);                 
                  else
                    console.log("error in saved quiz unsigned user");
                });
        });
   });
}

exports.addUser = (data,callback)=>{
  var new_id;
  dbconnection.getResult('select id from UniqId',(error,result)=>{
    new_id=result[0].id+1;
    dbconnection.getResult(`update UniqId set id= ${new_id}`,(error,result)=>{
      var user_id = "user"+new_id;
      dbconnection.getResult(`insert into users values('${user_id}','${data.fullname}','${data.email}','${data.mobile}','${data.password}'
        ,'${data.college}','${data.profession}');`,function(error,result){
              if(!error)
                callback(result);                 
              else
                console.log("error in insert user");
            });
    });
  });
}


exports.getUserById = function(id,callback){
 dbconnection.getResult(`SELECT email,password from users where email=\'${id}\'`,function(error,result){
             if(!error)
             {
                 if(result[0] === undefined || result[0] === null)
                 {
                     callback(undefined);
                     return ;
                 }
                  var res={uid:result[0].email,password:result[0].password};
                   callback(res);
             }else{

              console.log("error in get result");
             }
  });
}

exports.getCurrentUser= function(email,callback){
     dbconnection.getResult(`SELECT user_id from users where email=\'${email}\'`,function(error,result){
             if(!error)
             {
                 callback(result[0].user_id);
             }else
             {
                console.log("error in getCurrentUser ");
             }
     });
}
exports.getUserByEmail = function(email,callback){
  dbconnection.getResult(`select user_id from users where email = \'${email}\'`,function(error,result){
           if(!error){
            callback(result[0].user_id);
           }
           else
              console.log("error in by user by email");
   });
}

exports.getUniqId = function(callback){      
    dbconnection.getResult('select id from UniqId',(error,result)=>{
          if(error)
          {
            callback(undefined,"error");
          }
          else
          {
            var new_id=result[0].id+1;
            callback(null,new_id);
          }
    });
}
exports.updateUniqId = function(data,callback){
dbconnection.getResult(`update UniqId set id= ${data}`,(error,result)=>{

       if(error){
            callback(undefined,data);
       }else
       {
           callback(null,"sucessfully updated");
       }
   });
}

 exports.saveQuestion = (data,callback)=>{
      dbconnection.getResult('select id from UniqId',(error,result)=>{
        var new_id=result[0].id+1;
        var xx= new_id+1;
        dbconnection.getResult(`update UniqId set id= ${xx}`,(error,result)=>{
            var question_id = "question" + new_id;
            dbconnection.getResult(`insert into quiz_question values('${data.quiz_id}','${question_id}','${data.question_no}','${data.question}','${data.option1}','${data.option2}'
            ,'${data.option3}','${data.option4}','${data.correct}');`,function(error,result){
                    if(!error)
                        callback(result);                 
                    else
                        console.log("error in saved quiz unsigned user");
                    });
           });
      });
}

exports.signupQuiz =  (quizid,userid,callback)=>{
  dbconnection.getResult(`update quiz set quiz_status=1 where user_id='${userid}' and quiz_id='${quizid}';`,(error,result)=>{
         if (!error) {
          callback("sucessfully");
         }
         else
          console.log("error in sign up insert");
  });
}

exports.getPassword = (quizid,callback)=>{
  dbconnection.getResult(`select quiz_password from quiz where quiz_id='${quizid}'`,(error,result)=>{
    if (!error) {
      callback(result[0].quiz_password);
    }
    else
      console.log("error in getting password");
  });

}
exports.userDetails = (userid,callback)=>{
  dbconnection.getResult(`select * from users where email = '${userid}'`,(error,result)=>{
    if (!error) {
      callback(result[0]);
    }
    else
      console.log("error in user details");
  });

}

exports.getQuizHistory = (userid,callback)=>{
  dbconnection.getResult(`select * from quiz where user_id='${userid}' and quiz_status=2`,(error,result)=>{
    if(!error)
      callback(result);
    else
    callback("error in getting quiz history");
  });
}
exports.getQuizDetailsById = (quizid,callback)=>{
  dbconnection.getResult(`select * from quiz where quiz_id='${quizid}'`,(error,result)=>{
    if(!error)
      callback(result[0]);
    else
      console.log("error in gtuiqdetailsbyid");
  });
}
exports.updateProfile = (email,name,mobile,college,callback)=>{
  dbconnection.getResult(`update users set full_name ="${name}",mobile ="${mobile}",college_name="${college}" where email="${email}";`,(error,result)=>{
    if (!error)
      callback(result);
    else
      console.log("error in the updating the profile");
  });
}


exports.getAllQuestion = (quizid,callback)=>{


    dbconnection.getResult(`select * from quiz_question where quiz_id='${quizid}'`,(error,result)=>{


        if(!error)
        {
          // console.log("result of getAllQuestion " + result) ;
            //console.dir(result);
            callback(result);
        }
        else{

          console.log("error in getAllQuestion");
        }

    });
}

exports.getNoOfQuestion= (quizid,callback)=>{

       dbconnection.getResult(`select no_of_question from quiz where quiz_id = '${quizid}'`,(error,result)=>{

            if(!error)
                {
                   console.log("getnoofquestion " + result);
                    callback(result[0].no_of_question);
                }
                else{
                  console.log("error in getNoOfQuestion");
                }
       })
}

exports.getQuizDuration= (quizid,callback)=>{


    dbconnection.getResult(`select quiz_duration from quiz where quiz_id='${quizid}'`,(error,result)=>{

       if(!error){
            callback(result[0].quiz_duration);
       }else{
          console.log("error in quiz duration ");
       }
    })
}

exports.saveResult= (data,callback)=>{

    console.log("within save Result");

      dbconnection.getResult(`insert into result values ('${data.quiz_title}','${data.userid}','${data.quiz_id}',${data.no_of_question},
          ${data.correct},${data.attempted});`,(error,result)=>{

               if(!error){
                  console.log("result saved sucessfully");
                  callback("sucesss");


               }
               else
               {
                console.log("error in saving result");
               }
          })
}
exports.updateQuiz = (userid,quizid,callback)=>{

     dbconnection.getResult(`update quiz set quiz_status=2 where user_id='${userid}' and quiz_id='${quizid}';`,(error,result)=>{
         if (!error) {

          console.log("updated");
          callback("sucessfully");
         }
         else
          console.log("error in sign up insert");
  });
}

exports.getQuizByUserId = (userid,callback)=>{

       dbconnection.getResult(`select * from quiz where user_id='${userid}'`,(error,result)=>{

            if(!error){
                   callback(result);
            }
            else{
               
               console.log("error in getQuizByUserId");
            }
       });
}
exports.UpdateQuestion = (quizid,questionid,data,callback)=>{

    dbconnection.getResult(`update quiz_question set question_details='${data.question}',option1='${data.option1}',option2='${data.option2}',option3='${data.option3}',option4='${data.option4}',correcr_answer='${data.correct}'where question_id='${questionid}';`,(error,result)=>{

                             if(!error){
                                  callback("question updated sucessfully");
                             }
                             else{
                              console.log("error in UpdateQuestion");
                             }

    })
}
exports.getResultByUserId = (userid,callback)=>{

     dbconnection.getResult(`select * from result where user_id='${userid}'`,(error,result)=>{

           if(!error)
           {
             callback(result);
           }
           else{
            console.log("Error within getResultByUserid");
           }

     })
}

exports.getQuizTitleForResult=(quizid,callback)=>{
  // var xx='quiz318';

         dbconnection.getResult(`select quiz_title from quiz where quiz_id='${quizid}'`,(error,result)=>{

                 if(!error)
                 {
                  callback(result[0].quiz_title);
                 }else{
                  console.log("error within getquizTitle");
                 }

         })
}