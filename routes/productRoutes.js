const router = require('express').Router();
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const { authUser, authAdmin } = require('../authMiddleware');
const { canEditOrDeleteProduct } = require('../permissions/productPermissions');
const mongoose = require('mongoose');

// TODO: Purgatate into pages
router.get('/', (req, res) => {
	const category = req.query.category;
	const query = req.query.query;
	Product.find().then(result => res.send(result));
});

router.get('/test', async (req, res) => {
	res.send('You picked the wrong house fool!');
});

router.post('/buy', authUser, (req, res) => {
	// Check if request.body syntax is correct
	if (
		!req.body.products ||
		!req.body.products[0].product ||
		!req.body.products[0].amount
	)
		return res.sendStatus(400);

	new Order({
		products: req.body.products,
		buyerId: req.user.id
	})
		.save()
		.then(() => res.send('Transaction successful.'))
		.catch(err => res.send(err));
});

router.post('/new-product', authAdmin, (req, res) => {
	const newProduct = new Product({
		name: req.body.name,
		price: req.body.price,
		category: req.body.category,
		imagePath: req.body.imagePath
	});
	newProduct.save().then(result => res.send('Product added!'));
});

router.patch('/:productId', authAdmin, authEditOrDeleteProduct, (req, res) => {
	// Product.findByIdAndUpdate(req.product.)
});

router.delete(
	'/:productId',
	authAdmin,
	setProduct,
	authEditOrDeleteProduct,
	async (req, res) => {
		const productId = req.product.id;

		// Remove product from database
		await Product.findByIdAndDelete(productId);

		// Remove product id from all previous orders containing it
		await Order.updateMany(
			{ 'products.product': productId },
			{ $pull: { products: { product: productId } } }
		);
		res.send('Successfully deleted product.');
	}
);

function setProduct(req, res, next) {
	Product.findById(req.params.productId)
		.then(product => {
			if (product == null) {
				return res.sendStatus(404);
			}
			req.product = product;
			next();
		})
		.catch(e => res.sendStatus(404));
}

function authEditOrDeleteProduct(req, res, next) {
	if (!canEditOrDeleteProduct(req.product)) return res.sendStatus(403);
	next();
}

module.exports = router;
