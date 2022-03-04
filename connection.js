const mysql = require('mysql');
const con = mysql.createConnection({
          host : 'localhost',
          user : 'staff',
          password :'12345',
          database : 'mystaff'
})

con.connect((err)=>{
          if(err) throw err;
          console.log("connected")
})

module.exports.con = con;