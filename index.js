const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db.ts');
const User = require('./models/User.ts');
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    if(mongoose.connection.readyState === 1) {
        res.status(200).json({
            server: 'running',
            dbConnect: true
        });
    }
    else {
        res.status(503).json({
            server: 'running',
            dbConnect: false,
        });
    }
});

app.post('/api/createUser', async (req, res) => {
    const { walletAddress, firstName, lastName, userName, email, passHash } = req.body;
    const user = new User({
        walletAddress,
        firstName,
        lastName,
        userName,
        email,
        passHash
    });
    console.log(user);
    try {
        await user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.post('/api/checkId', async (req, res) => {
    const walletAddress  = req.body;
    console.log('Somebody is checking if user exists');

    console.log(walletAddress);
    if (walletAddress['wallet'] === null) {
        res.status(400).send('Invalid wallet address');
    }
    else {
        if (await User.exists({ walletAddress: walletAddress['wallet'] })) {
            res.status(200).send('User exists');
        }
        else {
            res.status(404).send('User does not exist');
        }
    }
});


app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});