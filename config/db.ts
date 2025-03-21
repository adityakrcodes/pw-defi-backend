const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected!!')
    }).catch((err) => {
        console.error(err.message)
        process.exit(1)
    })
}

module.exports = connectDB;