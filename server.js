// Dependencies
// ======================================================================================
const express = require('express');

const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Add routes, both API and view
// ======================================================================================
app.use(routes);

// Connection 
// ======================================================================================

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:password1@ds259528.mlab.com:59528/heroku_7ht8gkbz");

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});