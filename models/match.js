const mongoose= require('mongoose');
const {Schema} = require('mongoose');

const matchSchema = new Schema({
   teamId: {type: String},
   teamName: {type: String},
   description: {type: String},
   fPlayer: {type: String},
   sPlayer: {type: String},
   score: {type: String}
});

module.exports = mongoose.model('Match', matchSchema);