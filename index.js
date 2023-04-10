// require express, creating connection, and requirering the routes to run 
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// process model, this method returns a string specifying the current working directory of the node.js process
const cwd = process.cwd();

// creating a port for the app to listne on. 
const PORT = process.env.PORT || 3001;
const app = express();

// needed for post and put requests, not needed for get and delete, helps with sending data and storing it in an object 
app.use(express.urlencoded({ extended: true }));
//a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());
// use the routes created for the insomnia requests
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}!`);
  });
});