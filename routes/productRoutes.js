const router = require('express').Router();
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const { authUser, authAdmin } = require('../authMiddleware');
const { canEditOrDeleteProduct } = require('../permissions/productPermissions');
const { ROLES } = require('../config/data');

router.get('/', async (req, res) => {
	const itemsPerPage = 8;
	const page = parseInt(req.query.page) || 1;

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = page * itemsPerPage;

	const result = {};

	// Filter by category or search query, or return everything if there are no queries
	const category = new RegExp(escapeRegex(req.query.category), 'gi');
	const query = new RegExp(escapeRegex(req.query.query), 'gi');
	const minPrice = req.query.minPrice || 0;
	const maxPrice = req.query.maxPrice || 1000000000;
	result.results = await Product.find({
		category: category,
		name: query,
		price: { $gte: minPrice, $lte: maxPrice }
	})
		.limit(itemsPerPage)
		.skip(startIndex)
		.exec();

	if (startIndex > 0) result.previous = page - 1;
	if (endIndex < (await Product.countDocuments().exec())) result.next = page + 1;

	res.send(result);
});

router.post('/buy', authUser, verifyProductsSyntax, (req, res) => {
	new Order({
		products: req.body.products,
		buyerId: req.user.id
	})
		.save()
		.then(() => res.send('Transaction successful.'))
		.catch(err => res.send(err));
});

router.post('/cart', authUser, verifyProductsSyntax, (req, res) => {
	User.findByIdAndUpdate(req.user.id, { cart: req.body.products })
		.then(() => res.send('Cart updated.'))
		.catch(e => res.send(e));
});

router.get('/cart', authUser, verifyProductsSyntax, (req, res) => {
	User.findById(req.user.id)
		.then(user => res.send(user.cart))
		.catch(e => res.send(e));
});

router.post('/new-product', authAdmin, (req, res) => {
	const newProduct = new Product({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		category: req.body.category,
		imagePath: req.body.imagePath,
		isDefault: req.user.role === ROLES.MASTER && req.body.isDefault
	});
	newProduct
		.save()
		.then(() => res.send('Product added!'))
		.catch(e => res.send(e));
});

router.patch(
	'/:productId',
	authAdmin,
	setProduct,
	authEditOrDeleteProduct,
	(req, res) => {
		const [name, price, description, category, imagePath] = [
			req.body.name,
			req.body.price,
			req.body.description,
			req.body.category,
			req.body.imagePath
		];
		if (!name || !price || !category) return res.sendStatus(400);

		Product.findByIdAndUpdate(req.product.id, {
			name,
			price,
			description,
			category,
			imagePath
		})
			.then(() => res.send('Updated product.'))
			.catch(e => res.send(e));
	}
);

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

router.get('/:productId', setProduct, async (req, res) => {
	res.send(req.product);
});

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

// Determine of the authenticated user has authorization to edit or delete the product
function authEditOrDeleteProduct(req, res, next) {
	if (!canEditOrDeleteProduct(req.product, req.user)) return res.sendStatus(403);
	next();
}

// Protection against regex DDoS attacks
function escapeRegex(text) {
	if (text == null) text = '';
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function verifyProductsSyntax(req, res, next) {
	const products = req.body.products;
	if (!products || !products[0].product || !products[0].amount)
		return res.sendStatus(400);

	next();
}

module.exports = router;
