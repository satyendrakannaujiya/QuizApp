
const UNIQUEID = '
    create table UniqId(
    id int
    );'

const USERS = '
    create table users(
    user_id varchar(1000),
    full_name varchar(1000),
    email varchar(1000),
    mobile varchar(10),
    password varchar(1000),
    college_name varchar(1000),
    profession varchar(1000)
    );'

ALTER TABLE users
MODIFY COLUMN user_id varchar(1000);

create table quiz(
         user_id varchar(100),
         quiz_id varchar(100) primary key,
         subject varchar(1000),
         quiz_title varchar(10000),
         no_of_question int ,
         quiz_duration float,
         expiry_date date,
         quiz_password varchar(1000),
         quiz_status int default 0
);

create table quiz_status(
    user_id varchar(1000),
    quiz_id varchar(1000),
    status int 
);

create table quiz_question(
     quiz_id varchar(1000),
     question_id varchar(1000),
     question_no int,
     question_details varchar(10000),
     option1 varchar(10000),
     option2 varchar(10000),
     option3 varchar(10000),
     option4 varchar(10000),
     correcr_answer varchar(10000)
);

insert into quiz values ("1","nit1","dbms","dbms basic",20,2,STR_TO_DATE('1-01-2012', '%d-%m-%Y'),"sattu");


insert into quiz values ("2","nit2","os","Os basics",20,2,STR_TO_DATE('1-01-2012', '%d-%m-%Y'),"sayam");

insert into quiz values ("1","nit2","os","ALgorithm ",20,2,STR_TO_DATE('1-01-2012', '%d-%m-%Y'),"sayam");


insert into users values("4",'satyam','satyem@gmail.com','3242434','2323','mnnit','student');


insert into quiz_status values ("1","nit1",1);

	insert into quiz_status values ("2","nit3",1);
		insert into quiz_status values ("2","nit2",1);



select * from quiz inner join quiz_status on quiz.quiz_id=quiz_status.quiz_id where quiz_status.user_id=1 and quiz_status.status=1;

select * from quiz inner join quiz_status on quiz.quiz_id!=quiz_status.quiz_id;

SELECT * FROM quiz WHERE NOT EXISTS (SELECT * FROM quiz_status WHERE quiz_status.user_id=1 and quiz_status.quiz_id = quiz.quiz_id);

create table result(

    quiz_title varchar(100),
   user_id  varchar(100),
   quiz_id  varchar(100),
   no_of_question int,
   correct int,
   attempted int
)
    