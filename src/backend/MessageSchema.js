let mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
  author: String,
  message: String
});

module.exports = mongoose.model('Message', messageSchema);
