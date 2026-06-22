const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    try {
        // Validate the input
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        // Check if user already exists
        let user = await userController.findByUsername(username);
        if (user) {
            return res.status(400).send('User already exists');
        }

        // Create and save the user
        user = await userController.create(username, password);
        res.status(201).send('User created successfully ' + user._id);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

userRouter.route('/login').post(async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userController.findByUsername(username);

        if (user && await user.comparePassword(password)) {
            const payload = { _id: user._id };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Expires in 1 hour
            res.json({ token });
        } else {
            res.send('Login unsuccessfully');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = userRouter;
