import React from 'react';
import { Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

export function AuthRoute(props) {
	const isAuthenticated = useSelector(state => state.isAuthenticated);
	const Component = props.component;

	return isAuthenticated === 'loading' ? (
		<h1>Loading...</h1>
	) : isAuthenticated ? (
		<Component />
	) : (
		<Redirect to={{ pathname: '/login' }} />
	);
}

export function UnauthRoute(props) {
	const isAuthenticated = useSelector(state => state.isAuthenticated);
	const Component = props.component;

	return isAuthenticated === 'loading' ? (
		<h1>Loading...</h1>
	) : !isAuthenticated ? (
		<Component />
	) : (
		<Redirect to={{ pathname: '/' }} />
	);
}
