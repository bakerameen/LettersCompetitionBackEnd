const mongoose= require('mongoose');
const {Schema} = require('mongoose');

const answerSchema = new Schema({
    userName: {type: String},
    userCliceked: {type: Boolean}
  
});

module.exports = mongoose.model('Answer', answerSchema);