// Create web server
// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, 'comments.json');
var comments = require(commentsPath);
// Create routes
app.get('/comments', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});
app.post('/comments', jsonParser, function(req, res) {
  // add a new comment
  comments.push(req.body);
  // write the comments back to the file
  fs.writeFile(commentsPath, JSON.stringify(comments, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      // send the updated comments back to the client
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    }
  });
});
// Start server
app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});