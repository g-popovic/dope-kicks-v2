import React from 'react';
import CartTableItem from './CartTableItem';

import Navbar from '../reusable/Navbar';
import EditProductPanel from '../editProduct/EditProductPanel';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../redux/reduxActions';
import axiosApp from '../../utils/axiosConfig';
import axios from 'axios';

function CheckoutPage() {
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const total =
		cart !== 'loading' &&
		convertToReadablePrice(
			cart.reduce((total, item) => total + item.amount * item.product.price, 0)
		);

	function convertToReadablePrice(price) {
		return '$' + (Math.round(price) / 100).toFixed(2);
	}

	async function dummyPurchase() {
		try {
			const cartForBackend = cart.map(item => {
				return {
					product: item.product._id,
					amount: item.amount
				};
			});

			await axios.all([
				axiosApp.post('/products/buy', { products: cartForBackend }),
				axiosApp.post('/products/cart', { products: [] })
			]);
			dispatch(setCart([]));
			console.log('Purchase successful.');
		} catch (err) {
			console.log(err);
		}
	}

	return cart === 'loading' ? (
		<h1>Loading...</h1>
	) : (
		<>
			<Navbar />
			<EditProductPanel />
			<div className="checkout-page-container">
				{cart.length === 0 ? (
					<h1>Your cart is empty.</h1>
				) : (
					<>
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
									{cart.map(cartItem => (
										<CartTableItem
											product={cartItem.product}
											amount={cartItem.amount}
											key={cartItem.product._id}
										/>
									))}
								</tbody>
							</table>
						</div>

						<div className="checkout-container">
							<div className="checkout-prices">
								<p>
									<span>Subtotal: </span>
									<span>{total}</span>
								</p>
								<p>
									<span>Total: </span> <span>{total}</span>
								</p>
							</div>

							<button
								onClick={dummyPurchase}
								className="paypal-button btn-primary">
								PURCHASE NOW
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default CheckoutPage;
