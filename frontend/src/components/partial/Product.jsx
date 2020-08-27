import React from 'react';
import SettingsIcon from '../../images/settings-24px.svg';

function Product(props) {
	console.log(props);
	return (
		<div className="product">
			<img
				className="product-image"
				src="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=420&hei=420"
				alt="product"
			/>
			<p className="product-name">Amazin Sneaker</p>
			<p className="product-price">$399.00</p>
			<span>
				<button className="btn-primary">ADD TO CART</button>
				{props.isAdmin ? (
					<button
						className={
							'btn-edit ' + (props.canEdit ? '' : ' not-editable')
						}>
						<img src={SettingsIcon} />
						{props.canEdit ? null : (
							<span className="not-editable-tooltip">
								You can't edit a default product.
							</span>
						)}
					</button>
				) : null}
			</span>
		</div>
	);
}

export default Product;
