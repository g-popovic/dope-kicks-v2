import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthRoute, UnauthRoute } from './authRoutes/ProtectedRoute';

import Homepage from './homePage/Homepage';
import AdminPage from './adminStatsPage/AdminPage';
import LoginPage from './loginPage/LoginPage';
import CheckoutPage from './checkoutPage/CheckoutPage';

import { useDispatch, batch } from 'react-redux';
import { authLogin, authLogout, setRole } from '../redux/actions';
import axiosApp from '../utils/axiosConfig';
import axios from 'axios';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const source = axios.CancelToken.source();

		async function checkStatus() {
			try {
				const result = await axiosApp.get('/auth/status', {
					cancelToken: source.token
				});

				batch(() => {
					dispatch(authLogin());
					dispatch(setRole(result.data.role));
				});
			} catch (err) {
				dispatch(authLogout());
			}
		}

		checkStatus();

		return () => {
			source.cancel();
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
