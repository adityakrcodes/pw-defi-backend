let mongo = require('mongoose');

const User = new mongo.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    walletAddress : {
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passHash: {
        type: String,
        required: true
    }
});

module.exports = mongo.model('User', User);