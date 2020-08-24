const router = require('express').Router();
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const { authUser, authAdmin } = require('../authMiddleware');
const { canEditOrDeleteProduct } = require('../permissions/productPermissions');

// TODO: Purgatate into pages
router.get('/', (req, res) => {
	const category = new RegExp(escapeRegex(req.query.category), 'gi');
	const query = new RegExp(escapeRegex(req.query.query), 'gi');
	Product.find({ category: category, name: query })
		.then(result => res.send(result))
		.catch(e => res.send(e));
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
		const [name, price, category, imagePath] = [
			req.body.name,
			req.body.price,
			req.body.category,
			req.body.imagePath
		];
		if (!name || !price || !category || !imagePath) return res.sendStatus(400);

		Product.findByIdAndUpdate(req.product.id, {
			name: name,
			price: price,
			category: category,
			imagePath: imagePath
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

module.exports = router;
