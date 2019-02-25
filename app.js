var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('test/key.pem'),
  cert: fs.readFileSync('test/cert.pem')
};



// Create a service (the app object is just a callback).
var app = express();

app.use(express.static(path.join(__dirname, 'dist/pwa')));

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist/pwa/index.html'));
});

// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443, ()=> console.log('running HTTPS'));
