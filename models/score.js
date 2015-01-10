var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    type: String,
    default: 'No Name'
  },
  score: {
    type: Number,
    index: true
  }
});


var Score = mongoose.model('Score', schema);

module.exports = Score;
