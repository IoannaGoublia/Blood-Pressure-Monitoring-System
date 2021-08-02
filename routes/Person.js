var express = require('express');
 var ejs = require("ejs")
var nodemailer = require('nodemailer');
var router = express.Router();
var db=require('../database');
// another routes also appear here
// this script to fetch data from MS SQL SERVER databAse table
router.get('/user-list', function(req, res, next) {
        
           
        
        db.query('select * from Person' , function (err, data,fields) {
            
              if (err) throw err;
            
             console.log(data.recordset);
            
            
     
            db.query('select * from Person WHERE Diastolic =(select max(Diastolic) from Person)' , function (err, data1,fields) {
            
              if (err) throw err;
            
             console.log(data1.recordset);
 
             
            
               db.query('select * from Person  WHERE Diastolic > 90' , function (err, data2,fields) {
            
              if (err) throw err;
            
             console.log(data2.recordset);
  
 
                db.query('select * from Person  WHERE Systolic > 135' , function (err, data3,fields) {
            
              if (err) throw err;
            
             console.log(data3.recordset);
                          

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'doctorjohospital@gmail.com',
    pass: '12345678doctorjo'
  }
});

var mailOptions = {
  from: 'doctorjohospital@gmail.com',
  to: 'joannagoub@gmail.com',
  subject: 'Alert',
   html: 'Watch your app for details'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
              
             res.render('user-list', { title: 'User List',   userData :data.recordset, userData1 :data1.recordset ,userData2 :data2.recordset,userData3 :data3.recordset});
   
      });
     });
       });
          });
 });
router.get('/delete/:id', function(req, res, next) {
  var id=req.params.id ;
      console.log(id);
  
    db.query( 'DELETE FROM Person WHERE ID = id'  , function (err, data,fields) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/Person/user-list');
  
});
// write here create & display data script
 
router.get('/edit/:id', function(req, res, next) {
      var UserId= req.params.id;
      var sql=`SELECT * FROM Person WHERE ID= ?`;
      db.query(sql, [UserID],function (err, data) {
        if (err) throw err;
       
        res.render('user-list', { title: 'User List', editData: data[0]});
      });
});
router.post('/edit/:id', function(req, res, next) {
  var id= req.params.id;
    var updateData=req.body;
    var sql = `UPDATE Person SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/Person/user-list');
});
module.exports = router;