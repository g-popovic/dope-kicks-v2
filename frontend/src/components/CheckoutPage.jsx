import React from 'react';

function CheckoutPage() {
	return (
		<div className="checkout-page-container">
			<h1>My Cart</h1>
			<table cellSpacing="0" cellPadding="0">
				<thead>
					<tr>
						<th></th>
						<th>IMAGE</th>
						<th>NAME</th>
						<th>PRICE</th>
						<th>QUANTITY</th>
						<th>TOTAL</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="cart-delete">DEL</td>
						<td className="cart-product-image">
							<img
								alt="product"
								className="cart-product-image"
								src="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
							/>
						</td>
						<td className="cart-product-name">Air Force 1' Low</td>
						<td className="cart-product-price">$99.00</td>
						<td className="cart-amount">
							<input type="number" placeholder="0" />
						</td>
						<td className="cart-product-total">$198.00</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default CheckoutPage;
