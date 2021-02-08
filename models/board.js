const mongoose= require('mongoose');
const {Schema} = require('mongoose');

const boardSchema = new Schema({  
    letter: {type: String},
    color: {type: String},
    fontcolor: {type: String}   
});

module.exports = mongoose.model('Board', boardSchema);