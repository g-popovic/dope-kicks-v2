const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

// TODO: Experiment with redirecting in React
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	// res.send('Successfully authenticated with Google.');
	res.send('<a href="/auth/google">Log in again</a>');
});

router.post('/register', async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: await bcrypt.hash(req.body.password, 10)
	});

	req.login(await newUser.save(), err => {
		if (err) res.send(err);
		res.send('Successfully registered.');
	});
});

router.post(
	'/login',
	passport.authenticate('local', { failureMessage: true }),
	(req, res) => {
		res.send('Logged in successfully.');
	}
);

module.exports = router;
