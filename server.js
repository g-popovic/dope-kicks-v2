require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
require('./config/passportSetup');

const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 24 * 60 * 60 * 1000
		}
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Connect to routers
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.listen(5000, () => {
	console.log('Server running on port 5000');
});
