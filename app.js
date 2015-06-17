var express = require('express');
var morgan = require('morgan');
var app = express();
var swig = require('swig');

swig.setDefaults({ cache: false });

app.use(morgan('dev'));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname +'/views')


app.get('/', function(req, res){
  var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  res.render( 'index', {title: 'Hall of Fame', people: people} );
});


var server = app.listen(3000, function(){

  var host = server.address().address;
  var port = server.address().port;

  console.log('App lisening at http://%s:%s', host, port);
});

