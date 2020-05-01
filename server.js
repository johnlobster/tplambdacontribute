// server for tpCrisis web site, responds to POST
// cross-server, only accepts requests from tpcrisis website

require("dotenv").config(); // add variables in .env file to process.env
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3001;

// To do get environment variables and check for validity. Use them for all host names, etc.
const originAddress = process.env.TP_HOST_NAME || "http://localhost:3001";
if (!process.env.TP_EMAIL_ADDRESS) {
  throw new Error("No destination Email was set up");
}

// set up nodemailer
let transporter = nodemailer.createTransport({
  host: "smtp.comcast.net",
  port: 465,
  secure: true,
  auth: {
    user: "johnlobster",
    pass: "callcane"
  }
});
console.log("set up nodemailer");

// check mail server
transporter.verify(function (error, success) {
  if (error) {
    console.log("Bad connection to mail server");
    throw new Error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// send a test email
// transporter.sendMail({
//   from: "suspicious@dodgy.com",
//   to: "johnlobster@comcast.net",
//   subject: "Message title",
//   text: "Plaintext version of the message",
// }, (err, info) => {
//   if (err) {
//     console.log("Error sending message");
//     throw new Error(err);
//   } else {
//     console.log("Mail sent");
//   }
// }
// );

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

  console.log(mailString);
  transporter.sendMail({
    from: "suspicious@dodgy.com",
    to: "johnlobster@comcast.net",
    subject: "Message title",
    text: mailString,
  }, (err, info) => {
    if (err) {
      console.log("Error sending message");
      throw new Error(err);
    } else {
      console.log("Mail sent");
    }
  }
  );
  res.json({ contributeReturn: "Success" }); 

});

app.listen(PORT, () => { 
  console.log(`🌎 ==> tp lambda contributions server listening on port ${PORT}`); 
});
