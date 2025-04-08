const express = require('express');
const { register: registerHandler, login: loginHandler } = require('../controllers/authController.ts');

const authRouter = express.Router();

authRouter.post('/register', registerHandler);
authRouter.post('/login', loginHandler);

module.exports = authRouter;