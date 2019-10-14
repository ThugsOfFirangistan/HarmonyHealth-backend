const mysql = require('mysql');
const express=require('express');
const cors = require('cors');
var app=express();
const bodyparser=require('body-parser');

app.use(cors());
app.use(bodyparser.json());

//Establish connection with mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "/*YourPassword*/",
  databse: "/*YourDatabaseName*/"
});

//Return connection status
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Define Port
app.listen(8080,()=>
console.log('Server started at port 8080')
);

//Define table
const table='/calories';

app.get("/",(req,res)=>{
  con.query('SELECT * from harmony.calories',(err,rows,fields)=>{
    if(err) throw err;
    res.json(rows);
    console.log("called");
  })
})

app.get(table+'/:name',(req,res)=>{
  con.query('SELECT * FROM harmony.calories WHERE `name`=?',[req.params.name],(err,rows,fields)=>{
    if(err) throw err;
    let resultFromDb= Object.values(rows)[0]; 
    res.json(resultFromDb);
  })
})
