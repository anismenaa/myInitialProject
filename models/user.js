const mongoose = require('mongoose');

//create a user schema 
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    familyName: {
        type: String,
        required: true
    },
    surName: {
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
    password: {
        type: String,
        required: true
    },
    instagramLink: {
        type: String
    },
    DriveLink: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('User',userSchema);