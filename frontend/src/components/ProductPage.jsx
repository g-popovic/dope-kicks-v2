import React from 'react';
import ProductButtons from './partial/ProductButtons';

function ProductPage(props) {
	return (
		<div className="product-page-container">
			<div className="product-img-container">
				<img
					className="product-image"
					src="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
					alt="product"
				/>
			</div>
			<div className="product-details-container">
				<p className="product-page-name">Air Force 1' Low</p>
				<p className="product-page-price">$399.00</p>
				<p className="product-page-description">
					This item does not have a description. If you have Admin level
					clearence, you can edit this product and give it a description
					(as long as it's not a default product, in which case you need
					master clearance).
				</p>
				<ProductButtons isAdmin={true} canEdit={true} />
			</div>
		</div>
	);
}

export default ProductPage;
