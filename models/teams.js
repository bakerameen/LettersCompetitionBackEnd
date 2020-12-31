// const mongoose = require('mongoose');

// const teamSchema = mongoose.Schema({
//     teamName: [{ type: String}],
//     teamDescription: { type: String }
// });

// module.exports = mongoose.model('Team', teamSchema);



// New model 2021

const mongoose= require('mongoose');
const {Schema} = require('mongoose');

const teamSchema = new Schema({
   name: {type: String, required: true},
   description: String,
   

});

module.exports = mongoose.model('Team', teamSchema);