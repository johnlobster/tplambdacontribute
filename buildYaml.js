// reads google.yaml and adds .env environment variables, writes all to app.yaml

// require("dotenv").config(); // add variables in .env file to process.env
const fs = require('fs');

// read files

const googleData = fs.readFileSync("google.yaml", "utf8");
const envData = fs.readFileSync(".env", "utf8");

// parse .env file and write as yaml
let yamlData = "env_variables:\n";

let lines = envData.split("\n");
let tmpString = "";
for ( i=0; i < lines.length ; i++) {
  // console.log(lines[i]);
  tmpString = lines[i].replace('=', ": ");
  yamlData = yamlData + "  " + tmpString + "\n";
}

fs.writeFileSync("app.yaml", googleData + "\n" + yamlData);

