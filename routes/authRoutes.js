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
	try {
		const newUser = await new User({
			username: req.body.username,
			email: req.body.email,
			password: await bcrypt.hash(req.body.password, 10)
		}).save();

		req.login(newUser, err => {
			if (err) res.send(err);
			res.send('Successfully registered.');
		});
	} catch (err) {
		if (err.code === 11000) {
			return res.status(403).send('Email already taken.');
		}
		res.status(400).send(err);
	}
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

router.get('/status', authUser, (req, res) => {
	const data = {
		isLoggedIn: !!req.user,
		role: req.user.role
	};
	res.send(data);
});

module.exports = router;
