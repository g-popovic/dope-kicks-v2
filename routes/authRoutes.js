const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { authUser } = require('../authMiddleware');

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	res.send('Successfully authenticated with Google.');
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
	passport.authenticate('local', {
		successRedirect: '/auth/login/success',
		failureRedirect: '/auth/login/failed',
		failureFlash: true
	})
);

router.get('/login/failed', (req, res) => {
	res.status(401).send(req.flash('message')[0]);
});

router.get('/login/success', authUser, (req, res) => {
	res.send('Login successful.');
});

router.get('/logout', (req, res) => {
	req.logout();
	res.send('Logged out.');
});

module.exports = router;
