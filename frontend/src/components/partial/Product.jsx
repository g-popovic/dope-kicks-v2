import React from 'react';
import ProductButtons from './ProductButtons';

function Product(props) {
	console.log(props);
	return (
		<div className="product">
			<div className="product-img-container">
				<img
					className="product-image"
					src="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
					alt="product"
				/>
			</div>
			<p className="product-name">Amazin Sneaker</p>
			<p className="product-price">$399.00</p>
			<ProductButtons isAdmin={props.isAdmin} canEdit={props.canEdit} />
		</div>
	);
}

export default Product;
