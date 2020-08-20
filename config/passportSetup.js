const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => done(null, user));
});

passport.use(
	new GoogleStrategy(
		{
			// Options
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/redirect'
		},
		async (accessToken, refreshToken, profile, done) => {
			// Callback function
			const user = await User.findOne({ googleId: profile.id });
			if (user == null) {
				// Create a new user
				const newUser = await new User({
					username: profile.displayName,
					googleId: profile.id
				}).save();
			} else {
				// Log user in
				console.log('Found user: ', user);
			}
		}
	)
);
