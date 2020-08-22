const router = require('express').Router();
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const { authUser, authAdmin } = require('../authMiddleware');
const { canEditOrDeleteProduct } = require('../permissions/productPermissions');

router.use(setProduct);

// TODO: Purgatate into pages
router.get('/', (req, res) => {
	Product.find().then(result => res.send(result));
});

router.post('/buy', authUser, (req, res) => {
	// Check if request.body syntax is correct
	if (
		!req.body.products ||
		!req.body.products[0].productId ||
		!req.body.products[0].productCount
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
	res.send('Updating product...');
});

router.delete('/:productId', authAdmin, authEditOrDeleteProduct, (req, res) => {
	res.send('Deleting product...');
});

function setProduct(req, res, next) {
	if (!req.params.productId) return next();
	Product.findById(req.params.productId)
		.then(product => {
			if (product == null) {
				return res.sendStatus(404);
			}
			next();
		})
		.catch(e => console.log(e));
}

function authEditOrDeleteProduct(req, res, next) {
	if (!canEditOrDeleteProduct(req.product)) return res.sendStatus(403);
	next();
}

module.exports = router;
