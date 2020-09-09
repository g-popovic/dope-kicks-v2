import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthRoute, UnauthRoute } from './authRoutes/ProtectedRoute';

import Homepage from './homePage/Homepage';
import AdminPage from './adminStatsPage/AdminPage';
import LoginPage from './loginPage/LoginPage';
import CheckoutPage from './checkoutPage/CheckoutPage';

import { useDispatch } from 'react-redux';
import { authLogin, authLogout } from '../redux/actions';
import axios from '../utils/axiosConfig';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get('/auth/status', { withCredentials: true })
			.then(res => dispatch(authLogin()))
			.catch(e => dispatch(authLogout()));

		return () => {
			// cleanup;
		};
	}, []);

	return (
		<Router>
			<Switch>
				<UnauthRoute path="/login" component={LoginPage} />
				<AuthRoute exact path="/" component={Homepage} />
				<AuthRoute path="/cart" component={CheckoutPage} />
				<AuthRoute path="/admin" component={AdminPage} />
				<h1>Page not found: Error 404</h1>
			</Switch>
		</Router>
	);
}

export default App;
