const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true})); 
const mongoose = require('mongoose');
const routes = require('./app/routes/routes.js');

  /** @author Pooja Sharma / Database connection */

  mongoose.connect("mongodb://localhost:27017/Movies", {
      useNewUrlParser: true
  }).then(() => {
      console.log("Successfully connected to the database");
  }).catch(err => {
      console.log('Could not connect to the database...', err);
  });

  app.use('/', routes); 

  let port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`App listen on port  ${port}`));