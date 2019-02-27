
var express = require("express");
var app= express();

var PORT = process.env.PORT || 8080;
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(express.static("public"));



var path = require("path");



  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
  });

  // If no matching route is found default to home
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  require("./app/data/apiRoutes.js")(app);

 
app.listen(PORT, function() {

 
  console.log("Server listening on: http://localhost:" + PORT);


});