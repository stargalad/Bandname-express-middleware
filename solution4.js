// Importing required modules
import express from "express"; // Express.js for creating the server.
import bodyParser from "body-parser"; // body-parser for parsing incoming request bodies
import { dirname } from "path"; //Node.js built-in modules path and url for working with file and URL paths
import { fileURLToPath } from "url";

// Setting up the directory path
const __dirname = dirname(fileURLToPath(import.meta.url)); // gets directory name of current module file using dirname() function from the path module. 
// Creating an Express application instance and setting the port
const app = express();
const port = 3000;
var bandName = ""; // Initializing a variable to store band name

app.use(bodyParser.urlencoded({ extended: true }));

function bandNameGenerator(req, res, next) {
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}

app.use(bandNameGenerator);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
