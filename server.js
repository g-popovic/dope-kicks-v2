require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const passportSetup = require('./config/passportSetup');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

app.get('/', (req, res) => {
	res.send('suuuuhh');
});

app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.listen(5000, () => {
	console.log('Server running on port 5000');
});
