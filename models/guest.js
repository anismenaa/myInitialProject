const mongoose = require('mongoose');

const guestSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    registered: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Guest',guestSchema);