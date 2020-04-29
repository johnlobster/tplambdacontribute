// server for tpCrisis web site, responds to POST
// cross-server, only accepts requests from tpcrisis website

require("dotenv").config(); // add variables in .env file to process.env
const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;

// To do get environment variables and check for validity. Use them for all host names, etc.
// set up express
const app = express();                                                                            // Define middleware here                                                                         app.use(express.urlencoded({ extended: true }));                                                  app.use(express.json());

// middleware
app.use(express.json());

/* To do security
   check https
   check originating website
   check cors
*/
app.post("*", function (req, res) { 
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
  res.json({ contributeReturn: "Success" }); 

});

app.listen(PORT, () => { 
  console.log(`🌎 ==> tp lambda contributions server listening on port ${PORT}`); 
});
