//  **********************************************************
// CREATING A NODE.JS SERVER

// Require dependencies
var express = require('express');
var app = express();
var path = require('path');
var PORT = 443;
var request = require('request');
var https = require('https');
var fs = require('fs');

var ExpressPeerServer = require('peer').ExpressPeerServer;

var credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/itpphotobooth.ml/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/itpphotobooth.ml/cert.pem')
};


var server = https.createServer(credentials, app);

server.listen(PORT);



var PeerServer = ExpressPeerServer({
//  port: 8040,
  key: fs.readFileSync('/etc/letsencrypt/live/itpphotobooth.ml/privkey.pem'),
  certificate: fs.readFileSync('/etc/letsencrypt/live/itpphotobooth.ml/cert.pem')
});


app.use(express.static(path.join(__dirname, 'public')));

// Get request to me from index.html
app.get('/', function(req, res) {
  console.log('user enters..');
  res.redirect('/watcher/watcher-me.html');
});

console.log("App is served on localhost: " + PORT);


// Https listen on the port
// server.listen(3000, () => console.log(`Listening on ${ PORT }`));
                                                                    
