const fs= require("fs");


var express = require('express')
var router = express.Router()



router.post("/",function(req,res){

  console.log("within upload file handler");

  var quizid = req.body.quizid;

  var file = req.body.myFile;


var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('file')
});
var arr=[];
var count =0;
lineReader.on('line', function (line) {
  count++;
  arr.push(line);
  if(count===6)
   {
     count=0;
      
   }
  if(count ==0 )
  {
   // console.log(arr);
   console.log(arr[0]);
   console.log(arr[1]);
   console.log(arr[2]);
   console.log(arr[3]);
   console.log(arr[4]);
   console.log(arr[5]);


   console.log("\n");
   arr=[];
  }
});




  
  
})



module.exports = router

// var lineReader = require('readline').createInterface({
//   input: require('fs').createReadStream('demo.txt')
// });
// var arr=[];
// var count =0;
// lineReader.on('line', function (line) {
//   count++;
//   arr.push(line);
//   if(count===6)
//   	{
//   		count=0;
  		
//   	}
//   if(count ==0 )
//   {
//   	// console.log(arr);
//   	console.log(arr[0]);
//   	console.log(arr[1]);
//   	console.log(arr[2]);
//   	console.log(arr[3]);
//   	console.log(arr[4]);
//   	console.log(arr[5]);


//   	console.log("\n");
//   	arr=[];
//   }
// });

// var questions = fs.readFileSync('demo.txt','utf8',(err,data)=>{
//   if(!err)
//   	console.log('satyendra');
//   else 
//   	console.log(err);
// });

// console.log(typeof questions);
// for (var x = 0; x < questions.length; x++)
// {
// 	var c="";
// 	while(questions.charAt(x) != '\n') 
//       {
//       	c +=questions.charAt(x);
//       	x++;
//       }
//       console.log(c);	
// }