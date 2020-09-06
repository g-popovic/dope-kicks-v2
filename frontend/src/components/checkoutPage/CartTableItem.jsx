import React from 'react';
import DeleteIcon from '../../images/delete-24px.svg';

function CartTableItem(props) {
	return (
		<tr>
			<td className="cart-delete">
				<img alt="delete" src={DeleteIcon} />
			</td>
			<td className="cart-product-image">
				<img alt="product" src={props.imgUrl} />
			</td>
			<td className="cart-product-name">{props.name}</td>
			<td className="cart-product-price">{props.price}</td>
			<td className="cart-amount">
				<div>
					<button>-</button>
					<input type="number" placeholder="0" />
					<button>+</button>
				</div>
			</td>
			<td className="cart-product-total">$198.00</td>
		</tr>
	);
}

export default CartTableItem;
