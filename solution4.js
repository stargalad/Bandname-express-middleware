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

// Using body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// define a middleware function for band name generation
function bandNameGenerator(req, res, next) {
  console.log(req.body); // req.body is used to access the form data submitted by the client.
  bandName = req.body["street"] + req.body["pet"]; // retrieve the values of the "street" and "pet" 
  next(); // its abuilt in method to pass control to next middleware
}

app.use(bandNameGenerator); // using the middleware


// Define a route for the URL
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // method in Express.js used to send files to the client. giv  en the path to the file that will be sent
});

// Handle form submissions
app.post("/submit", (req, res) => {   //  takes two parameters that is req (request object) and res (response object).
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});

// Starting the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
