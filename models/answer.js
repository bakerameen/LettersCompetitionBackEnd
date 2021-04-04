const mongoose= require('mongoose');
const {Schema} = require('mongoose');

const answerSchema = new Schema({
    userName: {type: String},
    userCliceked: {type: Boolean},
    timerClass : {type: String}
  
});

module.exports = mongoose.model('Answer', answerSchema);