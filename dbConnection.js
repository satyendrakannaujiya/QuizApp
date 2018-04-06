var mysql  = require('mysql');

exports.getResult=function(query,callback){
  var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'quizdb',
   database : 'QuizDb'
 });
 connection.connect(function(error){
  	if(error){
  		console.log('error in connection');
  		callback(error);
  		return;
  	 }
    console.log('connection establish');
    connection.query(query,(error,result,data)=>{
    if (!error)
    {
        callback(null,result);
    }
    else  		
    {
         console.log("error in query execution and error is " + error);
    		callback(undefined,null);
    }
    connection.end((error,result)=>{
 	      if (error)
 		       console.log('error in connection ending');
 	      else
        {
 		       // console.log('connection close sucessfully');
         }
            });
         });
  	});
}
