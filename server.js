const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwtExp = require('express-jwt');
const cookieParser = require('cookie-parser');
const routes = require("./routes");
const agentMan = require('./config/config.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cookieParser(agentMan.secret));
// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('api/mood/users/auth/', jwtExp({
  secret: agentMan.secret,
  getToken: (req) => {return (req.signedCookies) ? req.signedCookies.jwtAuthToken : null},
}), (req, res, next) => {
  (req.user) ? next() : res.redirect('api/mood/login');
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') { 
    res.redirect('api/mood/login');
  }
});
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/moodb").catch(function (reason) {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
