import React from 'react';
import CartTableItem from './CartTableItem';
import PayPal from './PayPal';

function CheckoutPage() {
	return (
		<div className="checkout-page-container">
			<h1>My Cart</h1>
			<div className="cart-table-container">
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
						<CartTableItem
							name="Air Force 1' Low"
							price="$99.00"
							imgUrl="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
						/>
						<CartTableItem
							name="Air Force 1' Low"
							price="$99.00"
							imgUrl="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
						/>
						<CartTableItem
							name="Air Force 1' Low"
							price="$99.00"
							imgUrl="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
						/>
						<CartTableItem
							name="Air Force 1' Low"
							price="$99.00"
							imgUrl="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
						/>
						<CartTableItem
							name="Air Force 1' Low"
							price="$99.00"
							imgUrl="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
						/>
						<CartTableItem
							name="Air Force 1' Low"
							price="$99.00"
							imgUrl="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
						/>
						<CartTableItem
							name="Air Force 1' Low"
							price="$99.00"
							imgUrl="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
						/>
						<CartTableItem
							name="Air Force 1' Low"
							price="$99.00"
							imgUrl="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
						/>
						<CartTableItem
							name="Air Force 1' Low"
							price="$99.00"
							imgUrl="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
						/>
						<CartTableItem
							name="Air Force 1' Low"
							price="$99.00"
							imgUrl="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
						/>
						<CartTableItem
							name="Air Force 1' Low"
							price="$99.00"
							imgUrl="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
						/>
					</tbody>
				</table>
			</div>

			<div className="checkout-container">
				<div className="checkout-prices">
					<p>
						<span>Subtotal: </span> <span>$269.00</span>
					</p>
					<p>
						<span>Total: </span> <span>$287.44</span>
					</p>
				</div>

				<PayPal className="paypal-button" />
			</div>
		</div>
	);
}

export default CheckoutPage;
