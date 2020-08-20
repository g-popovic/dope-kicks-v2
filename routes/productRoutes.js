const router = require('express').Router();
const Product = require('../models/productModel');
const { authUser, authAdmin } = require('../authMiddleware');

router.get('/', (req, res) => {
	Product.find().then(result => res.send(result));
});

router.post('/new-product', (req, res) => {
	// const newProduct = new Product({
	// 	name: req.body.name,
	// 	price: req.body.price,
	// 	category: req.body.category,
	// 	imagePath: req.body.imagePath
	// });
	// newProduct.save().then(result => res.send('Product added!'));
	res.send('Adding post...');
});

router.patch('/update-product', (req, res) => {
	res.send('Updating product...');
});

module.exports = router;
