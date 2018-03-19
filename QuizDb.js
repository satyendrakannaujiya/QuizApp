
var ans ;
   var mysql  = require('mysql');
 

 
var dbconnection = require('./dbConnection.js');
 



 //}
exports.getUserName = function() {

var connection = dbconnection.getConnection();

var name ;

 connection.connect(function(err){

 		if (err) {
      console.error('error connecting: ' + err.stack);
    return;
    }

     console.log('connected as id ' + connection.threadId);

 	});

   connection.query('SELECT full_name from users ',function(err, rows, fields) {
       if (!err)
       {
   	   // ans= rows;
   	   
   	   console.log('The solution is: ', rows);
   	   name = rows;
   	   //return rows;
   	  //  rows.forEach( (row) => {
      //    console.log(`${row.full_name}`);
      // });
     
    }
   else
   {
     console.log('Error while performing Query.');
     
   }



 });


return name;

   //console.log("execute before solution");


 	//   return ans;
connection.end();



 }

 
 