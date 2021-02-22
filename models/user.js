

const mongoose = require('mongoose');

//create a user schema 
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    // w add location and name and surname after and a profile picture
    password: {
        type: String,
        required: true
    },
    instagramLink: {
        type: String
    },
    driveLink: {
        type: String,
        required: true
    },
    connected : {
        type: String ,
        required : true
    }

});

module.exports = mongoose.model('User',userSchema);