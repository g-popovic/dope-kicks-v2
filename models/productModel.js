const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	category: String,
	imagePath: String,
	description: {
		type: String,
		default:
			'This item does not have a description. If you have Admin level clearence or above, you can edit this product and give it a description.'
	},
	isDefault: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
