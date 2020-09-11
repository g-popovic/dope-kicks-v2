import React, { useState } from 'react';
import ProductButtons from './ProductButtons';
import { ROLES } from '../../utils/data';
import { Link } from 'react-router-dom';

function Product(props) {
	const canEdit =
		props.userRole === ROLES.MASTER ||
		(props.userRole === ROLES.ADMIN && !props.product.isDefault);

	const isAdmin = props.userRole === 'admin' || props.userRole === 'master';

	function setImgToDefault(e) {
		e.target.src = require('../../images/default_image.png');
	}

	return (
		<div className="product">
			<Link to={'/product/' + props.product._id}>
				<div className="product-img-container">
					<img
						className="product-image"
						src={props.product.imagePath}
						onError={setImgToDefault}
						alt="product"
					/>
				</div>
				<p className="product-name">{props.product.name}</p>
				<p className="product-price">
					{'$' + (Math.round(props.product.price) / 100).toFixed(2)}
				</p>
			</Link>
			<ProductButtons
				isAdmin={isAdmin}
				canEdit={canEdit}
				product={props.product}
			/>
		</div>
	);
}

export default Product;
