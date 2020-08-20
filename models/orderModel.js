const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		total: Number,
		products: [{ productId: String, productCount: Number }]
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
