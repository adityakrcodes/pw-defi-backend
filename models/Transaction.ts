let mongo = require('mongoose');

let Transaction = new mongo.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    walletAddress: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionHash: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    transactionStatus: {
        type: String,
        required: true
    }
})

module.exports = mongo.model('Transaction', Transaction);