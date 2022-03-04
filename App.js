const express = require('express');

const app = express();
const mysql = require("./connection").con
// -------configuration------
app.set("view engine","hbs");
app.set("views","./view")
app.use(express.static(__dirname + "/public"))
// app.use(express.urlencoded())
// app.use(express.json())

// ṛouting
app.get('/',(req,res)=>{
          res.render("index");
});

app.get('/add',(req,res)=>{
          res.render("add");
});

app.get('/search',(req,res)=>{
          res.render("search");
});

app.get('/update',(req,res)=>{
          res.render("update");
});

app.get('/delete',(req,res)=>{
          res.render("delete");
});

app.get('/view',(req,res)=>{
          let qry = "select * from test";
          mysql.query(qry,(err,result)=>{
        if(err) throw err;
        else{
                  res.render("view",{data : result});
        }
          })
});


app.get("/addstudent",(req,res)=>{
//         fetching data from form
// res.send(req.query)
const {name,phone_no,email,gender,Address} = req.query;
let qry ="select * from test where email=? or phone_no=?";
mysql.query(qry,[email,phone_no],(err,result)=>{
          if(err) throw err;
          else{
                   if(result.length>0){
                    res.render("add",{checkmesg:true})
                   }else{
                    //          insert query
                    let qry2 = "insert into test values(?,?,?,?,?)";
                    mysql.query(qry2,[name,phone_no,email,gender,Address],(err,result)=>{
                              if(result.affectedRows > 0){
                                        res.render("add",{mesg:true})
                              }
                    })
                   }
          }
})
})


app.get("/searchstudent",(req,res)=>{
          // fetch data from the form
          const {phone_no} = req.query;

          let qry = "select * from test where phone_no=?";
          mysql.query(qry,[phone_no],(err,result)=>{
                    if(err) throw err;
                    else{
                              if(result.length > 0){
                                 res.render("search", {mesg1: true, mesg2: false})
                              }
                              else{
                                  res.render("search",{mesg1: false, mesg2: true})
                              }
                    }
          })
})

app.get("/updatesearch",(req,res)=>{
          const {phone_no} = req.query;
          let qry = "select * from test where phone_no=?";
          mysql.query(qry,[phone_no],(err,result)=>{
                    if(err) throw err;
                    else{
                              if(result.length > 0){
                                 res.render("update", {mesg1: true, mesg2: false,data:result})
                              }
                              else{
                                  res.render("update",{mesg1: false, mesg2: true})
                              }
                    }
          })
})


app.get("/updatestudent", (req,res)=>{
          // fetch data
          const {name,gender,Address,phone_no} = req.query;
          let qry = "update test set name=?, gender=?, addres=? where phone_no=?";
          mysql.query(qry, [name,gender,Address,phone_no], (err,result)=>{
                    if(err) throw err;
                    else{
                              if(result.affectedRows > 0){
                                        res.render("update",{ umesg : true})
                              }
                    }
          })
})

app.get("/removestudent",(req,res)=>{
          // fetch data
          
                    // fetch data from the form
                    const { phone_no } = req.query;

                    let qry = "delete from test where phone_no=?";
                    mysql.query(qry,[phone_no],(err,result)=>{
                              if(err) throw err;
                              else{
                                        if(result.affectedRows > 0){
                                           res.render("delete", {mesg1: true, mesg2: false})
                                        }
                                        else{
                                            res.render("delete",{mesg1: false, mesg2: true})
                                        }
                              }
                    });
          });




// Create Server
app.listen(5000,function(err){
if(err) throw err;
else{
          console.log("server is running")
}

});
