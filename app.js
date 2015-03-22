var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var pg = require('pg');
var models = require('./models/index.js');

//middleware setup
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(methodOverride("_method"));

//routes:
app.get('/index', function(req, res){
  models.Chirp.findAll().done(function(err, data){
    res.render('index', {
      allChirps: data
    });
  });
});

app.get('/edit/:id', function(req, res){
  models.Chirp.find(req.params.id).done(function(err, data){
    res.render('edit', {
      chirp: data
    });
  });
});

app.post('/new', function(req, res){
  models.Chirp.create({
    chirp: req.body.chirp
  }).done(function(err, data){
    res.redirect('/index');
  });
});

app.put('/edit/:id', function(req, res){
  models.Chirp.find(req.params.id).done(function(err, data){
    data.updateAttributes({
      chirp: req.body.chirp
    }).done(function(err, data){
      res.redirect('/index');
    });
  });
});

app.delete('/delete/:id', function(req, res){
  models.Chirp.find(req.params.id).done(function(err, data){
    data.destroy().done(function(error, data){
      res.redirect('/index');
    });
  });
});

app.listen(3000);


