var express = require('express');
var morgan = require('morgan');
var app = express();
var swig = require('swig');
var routes = require('./routes/');
var bodyParser = require('body-parser');

swig.setDefaults({ cache: false });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname +'/views')

app.use('/', routes);
app.use(express.static(__dirname + '/public'));


// app.get('/', function(req, res){
//   var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//   res.render( 'index', {title: 'Hall of Fame', people: people} );
// });



var server = app.listen(3000, function(){

  var host = server.address().address;
  var port = server.address().port;

  console.log('App lisening at http://%s:%s', host, port);
});

