import React from 'react';
import CartIcon from '../../images/shopping_cart-24px.svg';
import StoreIcon from '../../images/store-24px.svg';
import LogoutIcon from '../../images/exit_to_app-24px.svg';
import NewProductIcon from '../../images/add_business-white-18dp.svg';
import Burger from '../../images/menu-24px.svg';
import ChartIcon from '../../images/insert_chart-white-18dp.svg';
import CloseIcon from '../../images/close-24px.svg';

import { useSelector, useDispatch, batch } from 'react-redux';
import {
	toggleNavOpen,
	toggleEditPanel,
	authLogout,
	setRole
} from '../../redux/reduxActions';
import axiosApp from '../../utils/axiosConfig';
import { Link } from 'react-router-dom';

function Navbar() {
	const isOpen = useSelector(state => state.isNavOpen);
	const userRole = useSelector(state => state.userRole);
	const dispatch = useDispatch();

	async function logout() {
		try {
			await axiosApp.post('/auth/logout');

			batch(() => {
				dispatch(authLogout());
				dispatch(setRole(null));
			});
		} catch (e) {
			console.log(e);
		}
	}

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
					<NavItems
						userRole={userRole}
						toggleNewProduct={() => dispatch(toggleEditPanel())}
						logout={logout}
					/>
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
						<NavItems
							userRole={userRole}
							toggleNewProduct={() => dispatch(toggleEditPanel())}
							logout={logout}
						/>
					</ul>
				</div>
			</div>
		</nav>
	);
}

function NavItems(props) {
	return (
		<>
			<li>
				<Link to="/">
					<img className="hide-desktop" alt="store" src={StoreIcon} />
					<p className="hide-mobile">Home</p>
				</Link>
			</li>
			{props.userRole === 'admin' || props.userRole === 'master' ? (
				<>
					<li onClick={props.toggleNewProduct}>
						<img
							className="hide-desktop"
							alt="add item"
							src={NewProductIcon}
						/>
						<p className="hide-mobile">Add Product</p>
					</li>
					<li>
						<Link to="/admin">
							<img
								className="hide-desktop"
								alt="store"
								src={ChartIcon}
							/>
							<p className="hide-mobile">Statistics</p>
						</Link>
					</li>
				</>
			) : null}
			<li>
				<Link to="/cart">
					<Cart amount={3} />
				</Link>
			</li>
			<li onClick={props.logout}>
				<img className="hide-desktop" alt="logout" src={LogoutIcon} />
				<p className="hide-mobile">Logout</p>
			</li>
		</>
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
