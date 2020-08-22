const router = require('express').Router();
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const { authAdmin } = require('../authMiddleware');
const mongoose = require('mongoose');

router.use(authAdmin);

router.get('/general-stats', async (req, res) => {
	const [users, sales, products] = await Promise.all([
		User.find(),
		Order.find(),
		Product.find()
	]);
	res.send({
		userCount: users.length,
		saleCount: sales.length,
		productCount: products.length
	});
});

router.get('/bestsellers', async (req, res) => {
	// Turn orders into an array containing sale per product
	const orders = await Order.find();
	const allProductSales = {};
	orders.forEach(order => {
		order.products.forEach(product => {
			productId = String(product.productId);
			allProductSales[productId] = allProductSales[productId]
				? allProductSales[productId] + product.productCount
				: product.productCount;
		});
	});

	// Move the data into a 2D array and sort it by the amount of sales
	let bestsellerIds = [];
	for (let product in allProductSales) {
		bestsellerIds.push([product, allProductSales[product]]);
	}
	bestsellerIds
		.sort((a, b) => {
			return a[1] - b[1];
		})
		.reverse()
		.slice(0, 8);

	// Get product details for each id
	const products = await Product.find({
		_id: {
			$in: bestsellerIds.map(bestseller =>
				mongoose.Types.ObjectId(bestseller[0])
			)
		}
	})
		.lean()
		.exec();
	const result = bestsellerIds.map(currentBestseller => {
		const fullProduct = products.find(
			product => String(product._id) === currentBestseller[0]
		);
		fullProduct.timesSold = currentBestseller[1];
		return fullProduct;
	});

	res.send(result);
});

module.exports = router;
