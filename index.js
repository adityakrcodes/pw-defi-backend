const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db.ts');
const User = require('./models/User.ts');
const Transaction = require('./models/Transaction.ts');
const cors = require('cors');
const authRouter = require('./routes/authRoute.ts');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

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

app.post('/api/register', async (req, res) => {
    const { walletAddress, firstname, lastname, username, email, password } = req.body;
    const user = new User({
        walletAddress,
        firstname,
        lastname,
        username,
        email,
        password
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
            res.status(200).json({ 
                exists: true
             });
        }
        else {
            res.status(404).json({
                exists: false
            });
        }
    }
});

app.get('/api/getUser/:walletAddress', async (req, res) => {
    const walletAddress = req.params.walletAddress;
    console.log('Fetching user data');
    console.log(walletAddress);
    try {
        const user = await User.findOne({ walletAddress: walletAddress });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.post('/api/createTransaction', async (req, res) => {
    console.log('Creating a transaction');
    const { walletAddress, token, amount, transactionType, transactionStatus, transactionHash } = req.body;
    const transaction = new Transaction({
        walletAddress, token, amount, transactionType, transactionStatus, transactionHash
    });
    try {
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Failed to create transaction', error });
    }
});

app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});