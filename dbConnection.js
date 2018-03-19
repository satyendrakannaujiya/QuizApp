
var mysql  = require('mysql');

exports.getConnection = function()
{
  var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'quizdb',
   database : 'QuizDb'
 });

  return connection;

}