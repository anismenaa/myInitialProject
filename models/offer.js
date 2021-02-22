const mongoose = require('mongoose');

//each offer contains :type (wedding photos , porteries , video clip (no music), advertisements for the  ) , title , description , price 
const offerSchema = mongoose.Schema({
    byIdUser : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now(),
    }
    // we will see with the price thing 
});

module.exports = mongoose.model('Offer',offerSchema);