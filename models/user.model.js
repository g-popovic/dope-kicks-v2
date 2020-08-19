const mongoose = require('mongoose');
const { ROLE } = require('../data');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	role: { type: String, default: ROLE.BASIC },
	cart: [{ productId: String, productCount: Number }],
	password: String,
	googleId: String
});

const User = mongoose.model('User', userSchema);

module.export = User;
