const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',	
    database: 'blog'
});

connection.connect((err)=>{
    if(err){
      console.log("error connecting to mysql");
    }else{
      console.log("connected succesfully");
    }
});

module.exports = connection;