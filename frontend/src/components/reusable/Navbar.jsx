import React from 'react';
import CartIcon from '../../images/shopping_cart-24px.svg';
import StoreIcon from '../../images/store-24px.svg';
import LogoutIcon from '../../images/exit_to_app-24px.svg';
import NewProductIcon from '../../images/add_business-white-18dp.svg';
import Burger from '../../images/menu-24px.svg';
import CloseIcon from '../../images/close-24px.svg';

import { useSelector, useDispatch } from 'react-redux';
import { toggleNavOpen, toggleEditPanel } from '../../redux/actions';

function Navbar() {
	const isOpen = useSelector(state => state.isNavOpen);
	const dispatch = useDispatch();

	return (
		<nav>
			<p className="nav-logo">AMAZOON</p>
			<span>
				<button className="menu-button  hide-desktop">
					<img
						src={Burger}
						alt="menu"
						onClick={() => dispatch(toggleNavOpen())}
					/>
				</button>
				<ul className="hide-mobile">
					<li>Store</li>
					<li>
						<Cart amount={3} />
					</li>
					<li onClick={() => dispatch(toggleEditPanel())}>
						Create Product
					</li>
					<li>Logout</li>
				</ul>
			</span>

			<div
				id="nav-background"
				className={'nav-mobile-panel-background' + (isOpen ? '' : ' hidden')}
				onClick={e => {
					if (e.target.id === 'nav-background') {
						dispatch(toggleNavOpen());
					}
				}}>
				<div className="nav-mobile-panel">
					<img
						className="close-nav-panel"
						src={CloseIcon}
						alt="close menu"
						onClick={() => dispatch(toggleNavOpen())}
					/>

					<ul onClick={() => dispatch(toggleNavOpen())}>
						<li>
							<img alt="store" src={StoreIcon} />
						</li>
						<li>
							<Cart amount={3} />
						</li>
						<li onClick={() => dispatch(toggleEditPanel())}>
							<img alt="add item" src={NewProductIcon} />
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
