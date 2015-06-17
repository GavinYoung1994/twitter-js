var express = require('express');
var router = express.Router();

// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');



module.exports = function(io){
  router.get('/', function (req, res, next) {
    var tweets = tweetBank.list();
    var name = 'Nimit';
    res.render( 'index', { title: 'Twitter.js', tweets: tweets, name: name, showForm: true } );
  });


  router.get('/users/:name', function(req, res, next) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    //console.log(name);
    //console.log(list);
    res.render( 'index', { title: 'Twitter.js - Posts by '+ name, tweets: list, name:name, showForm: true, user:true } );

  });

  router.get('/users/:name/tweets/:id', function(req, res, next) {
    var id = req.params.id;
    var list = tweetBank.find( {id: parseInt(id)} );
    //console.log(name);
    console.log('what is ', list);
    res.render( 'index', { title: 'Twitter.js - Posts by '+list[0].name, tweets: list, name:list[0].name } );

  });

  router.post('/submit', function(req, res){
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.emit('new_tweet', tweetBank.find({text:text})[0]);
    res.redirect('/');
  });
  return router;
};