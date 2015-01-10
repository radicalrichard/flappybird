
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');
var mongoUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/flappy-scores';
mongoose.connect(mongoUrl);

var Room = require(__dirname + '/models/room');
var Score = require(__dirname + '/models/score');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/scores', function(req, res){
  var score = Score
              .find({})
              .sort('-score')
              .limit(20)
              .select('name score')
              .exec(function(err, scores){
    res.json(scores);
  });
});

app.post('/scores', function(req, res){
  var score = new Score({
    name: req.body.name,
    score: req.body.score
  });
  score.save(function (err, score) {
    if (err) return handleError(err);
    res.json(score);
  });
});

app.get('/', routes.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
