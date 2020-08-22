const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		products: [{ productId: String, productCount: Number }],
		buyerId: String
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
