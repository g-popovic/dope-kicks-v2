const mongoose = require('mongoose');
const { ROLES } = require('../config/data');

const userSchema = new mongoose.Schema({
	username: String,
	email: { type: String, required: true, unique: true },
	role: { type: String, default: ROLES.BASIC },
	cart: [{ productId: String, productCount: Number }],
	password: String,
	googleId: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
