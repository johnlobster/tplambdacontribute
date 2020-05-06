// server for tpCrisis web site, responds to POST
// cross-server, only accepts requests from tpcrisis website

require("dotenv").config(); // add variables in .env file to process.env
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3001;

// To do get environment variables and check for validity. Use them for all host names, etc.
if (!process.env.TP_EMAIL_ADDRESS) {
  throw new Error("No destination Email was set up");
}

// Check that all environment variables to access the mail server are present

if ( 
  ! process.env.TP_NODEMAILER_HOST ||
  ! process.env.TP_NODEMAILER_PORT ||
  ! process.env.TP_NODEMAILER_SECURE ||
  ! process.env.TP_NODEMAILER_AUTH_USERNAME ||
  ! process.env.TP_NODEMAILER_AUTH_PASSWORD
) {
  throw new Error("Missing environment variable required to access mail server");
}
// set up nodemailer
let transporter = nodemailer.createTransport({
  host: process.env.TP_NODEMAILER_HOST,
  port: process.env.TP_NODEMAILER_PORT,
  secure: process.env.TP_NODEMAILER_SECURE,
  auth: {
    user: process.env.TP_NODEMAILER_AUTH_USERNAME,
    pass: process.env.TP_NODEMAILER_AUTH_PASSWORD
  }
});



// set up express
const app = express(); 

// middleware
app.use(express.json());

/* To do security
   check https
   check originating website
   check cors
   check json sent
*/
app.post("*", cors(), function (req, res) { 
  // (name="", subject="", message="")
  console.log("Message received");
  
  let mailString= "";
  // check for valid json in request body
  if ((!req.body) || ((!req.body.name) && (!req.body.subject) && (!req.body.message)) ) {
    console.log("No body");
    res.json({ contributeReturn: "No content" }); 
  }
  // fill in missing fields if necessary
  let userName = "";
  if (! req.body.name ) {
    userName="";
  } else {
    userName=req.body.name;
  }
  let userSubject = "";
  if (!req.body.subject) {
    userSubject = "";
  } else {
    userSubject = req.body.subject;
  }
  let userMessage = "";
  if (!req.body.message) {
    userMessage = "";
  } else {
    userMessage = req.body.message
  }

  // To do check for invalid characters and escape them
  // To do Check that maximum string length not exceeded (truncate)
  
  mailString = `
  Name: ${userName}
  Subject: ${userSubject}

  ${userMessage}

  Send date: 

  `
  // To do send to mail, check return result, wait for timeout
  // return "Contribution failed"

  transporter.sendMail({
    from: "suspicious@dodgy.com",
    to: process.env.TP_EMAIL_ADDRESS,
    subject: "Your web page would like to talk to you",
    text: mailString,
  }, (err, info) => {
    if (err) {
      res.json({ contributeReturn: "Contribution failed"});
      console.log("Mail failed to send");
      console.log(err);
    } else {
      res.json({ contributeReturn: "Success" }); 
    }
  }
  );

});

// check mail server, don't start http server until mail server has been verified
transporter.verify(function (error, success) {
  if (error) {
    throw new Error("Failed connection to mail server");
  } else {
    console.log("Mail server is ready to take our messages");
    app.listen(PORT, () => {
      console.log(`🌎 ==> tp lambda contributions server listening on port ${PORT}`);
    });
  }
});
