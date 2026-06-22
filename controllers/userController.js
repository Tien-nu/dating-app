const User = require('../models/user');

// Find a user by username
exports.findByUsername = async (username) => {
    return User.findOne({ username });
};

// Create and persist a new user
exports.create = async (username, password) => {
    const user = new User({ username, password });
    await user.save();
    return user;
};
