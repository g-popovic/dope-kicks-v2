const router = require('express').Router();
const Product = require('../models/productModel');
const { authUser, authAdmin } = require('../authMiddleware');
const { canEditOrDeleteProduct } = require('../permissions/productPermissions');

router.get('/', (req, res) => {
	Product.find().then(result => res.send(result));
});

router.post('/buy', authUser, (req, res) => {
	res.send('Buying product...');
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

router.patch(
	'/:productId',
	authAdmin,
	setProduct,
	authEditOrDeleteProduct,
	(req, res) => {
		res.send('Updating product...');
	}
);

router.delete(
	'/:productId',
	authAdmin,
	setProduct,
	authEditOrDeleteProduct,
	(req, res) => {
		res.send('Deleting product...');
	}
);

function setProduct(req, res, next) {
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
