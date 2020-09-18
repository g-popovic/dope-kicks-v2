require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const flash = require('connect-flash');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const adminStatsRoutes = require('./routes/adminStatsRoutes');
require('./config/passportSetup');

const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	cors({
		credentials: true,
		origin:
			process.env.NODE_ENV === 'production'
				? 'http://dope-kicks.xyz'
				: 'http://localhost:3000'
	})
);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000
		}
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	autoIndex: true,
	useFindAndModify: false
});
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Connect to API endpoints
app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminStatsRoutes);

// Serve static files when in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server running on port ' + PORT);
});
