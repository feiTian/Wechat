var express = require('express')
  , bodyParser = require('body-parser')
  , compress = require('compression');

var secretParam = require('./routes/jwt-secret').secretParam;

var app = express();

app.use(bodyParser.json({uploadDir:'./uploads'}));
app.use(function (req, res, next) {
  console.log('body: ' + req.url);
  if(req.url.indexOf('psrc') > -1){
      trackUser(req, res);
  }

    next();
  });

// Setup header, for initial debugging
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(compress());
app.use(allowCrossDomain);
app.use('/', express.static(__dirname + '/public'));


var server = app.listen(7100, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});


