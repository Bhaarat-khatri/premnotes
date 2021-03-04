var express = require('express');
const {
  dirname
} = require('path');
let alert = require('alert'); 
const path = require("path");
const {
  render
} = require("ejs");
//connection with mongodb
require("./mongoose/db");
//require schemas
require("./mongoose/schemas")
//bodyparser
var bodyParser = require('body-parser')
// mail feeback form 
const fetch = require('node-fetch');

const sendMail = require('./mail/mail');
const mongoose = require("mongoose");
const {
  Year,
  subject,
  sems,
  notification,
  num,
  Branch
} = require('./mongoose/schemas');
const {
  log
} = require('console');

var app = express();
//define ejs
app.set('view engine', 'ejs');
// respond with "hello world" when a GET request is made to the homepage
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());

var fullUrl = "/";

app.get('/', function (req, res) {
  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  if(req.get('host')!="localhost:8080")
  {fetch("https://api.countapi.xyz/update/premnotes/notes?amount=1");}
  notification.find((err,results) => {
    num.find((err,result) => {
      res.render("index" ,{
        resl : results,
        resl2 : result,
      });
    }); 
  });
});

app.get('/notes', function (req, res) {
  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  Branch.find((err, results) => {
    res.render("branch", {
      resl: results,
    });
  });
});

app.get('/notes/:branches', function (req, res) {
  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  Year.find((err, results) => {
    res.render("year", {
      resl: results,
      branch: req.params.branches
    });

  });

});

app.get('/notes/:branches/:year', function (req, res) {
  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const k = req.params.year;
  sems.find({
    select: k
  }, (err, results) => {
    res.render("semester", {
      resl: results,
      branch: req.params.branches,
      year: req.params.year,
    });
  });
});

app.get('/notes/:branches/:year/:sem', function (req, res) {
  fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var a = req.params.branches;
  var b = req.params.year;
  var c = req.params.sem;
  var d = a + b + c;
  subject.find({
    select: d
  }, (err, results) => {
    if (results.length === 0) {
      res.render("error");
    } else {
      res.render("subject", {
        resl: results,
        branch: req.params.branches,
        year: req.params.year,
        sems: req.params.sem,
      });
    }
  });
});



app.get('/form', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
  //__dirname : It will resolve to your project folder.
});

//form post
app.post('/email', (req, res) => {
  //Send an email here but currently dummy email

  const subject = req.body.subject;
  const email = req.body.email;
  const text = req.body.text;

  sendMail(email, subject, text, function (err, data) {
    if (err) {

      res.status(500).json({
        message: 'Internal Error'
      });
    } else {
      
      alert("form submitted")
    res.redirect(fullUrl);
    }
  });

});

app.get('/dev', function (req, res) {
  res.render("dev");
  //__dirname : It will resolve to your project folder.
});

app.get("/compose", function (req, res) {
  res.render("newvalue");
});

app.post("/compose", function (req, res) {
  const number = new num({
    value: req.body.newvalue
  });
  number.save();
  res.redirect("/compose1");
});

app.get("/compose1", function (req, res) {
  res.render("newdata");
});

app.post("/compose1", function (req, res) {
  const noti = new notification({
    text: req.body.composeText
  });

  noti.save();
  res.redirect("/compose1");
});

const Port = process.env.PORT || 8080 ;

app.listen(Port, () => {
  console.log("Your server is started at port " + Port);
});






// app.get('/notes/:branches/:year/:sem/:subject', function (req, res) {
//   var a = req.params.branches;
//   var b = req.params.year;
//   var c = req.params.sem;
//   var d = req.params.subject;
//   var e = a + b + c + d;

//   content.find({
//     select: e
//   }, (err, results1) => {
//     pdf.find({select : e}, (err, results2) => {
//       res.render("content", {
//         res1: results1,
//         res2: results2,
//       });
//     });
//   });
// });