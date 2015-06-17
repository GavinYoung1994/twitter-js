var express = require('express');
var morgan = require('morgan');
var app = express();
var swig = require('swig');

app.use(morgan('dev'));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname +'/views')


app.get('/', function(req, res){
  res.send('Server Listening');
});

app.get('/news', function(req, res){
  res.send('News');
});

var server = app.listen(3000, function(){

  var host = server.address().address;
  var port = server.address().port;

  console.log('App lisening at http://%s:%s', host, port);
});

