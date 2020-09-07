import React from 'react';
import CartIcon from '../../images/shopping_cart-24px.svg';
import StoreIcon from '../../images/store-24px.svg';
import LogoutIcon from '../../images/exit_to_app-24px.svg';
import Burger from '../../images/menu-24px.svg';
import CloseIcon from '../../images/close-24px.svg';

function Navbar() {
	return (
		<nav>
			<p className="nav-logo">AMAZOON</p>
			<span>
				<button className="menu-button  hide-desktop">
					<img src={Burger} alt="menu" />
				</button>
				<ul className="hide-mobile">
					<li>Store</li>
					<li>
						<Cart amount={3} />
					</li>
					<li>Logout</li>
				</ul>
			</span>

			<div className="nav-mobile-panel-background hidden">
				<div className="nav-mobile-panel">
					<img
						className="close-nav-panel"
						src={CloseIcon}
						alt="close menu"
						onClick={console.log('closed')}
					/>

					<ul>
						<li>
							<img alt="store" src={StoreIcon} />
						</li>
						<li>
							<Cart amount={3} />
						</li>
						<li>
							<img alt="logout" src={LogoutIcon} />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

function Cart(props) {
	return (
		<>
			<img alt="cart" src={CartIcon} />
			<span className="cart-item-count">
				<p>{props.amount}</p>
			</span>
		</>
	);
}

export default Navbar;
