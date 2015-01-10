var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    type: String,
    default: 'No Name'
  },
  players: [{
    name: String,
    score: Number
  }],
  createdAt: Date,
  modifiedAt: Date
});


var Room = mongoose.model('Room', schema);

module.exports = Room;
