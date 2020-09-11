import React from 'react';
import { Redirect } from 'react-router-dom';
import { ROLES } from '../../utils/data';

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

export function AdminRoute(props) {
	const userRole = useSelector(state => state.userRole);
	const isAuthenticated = useSelector(state => state.isAuthenticated);
	const Component = props.component;

	return isAuthenticated === 'loading' ? (
		<h1>Loading...</h1>
	) : isAuthenticated ? (
		userRole === ROLES.ADMIN || userRole === ROLES.MASTER ? (
			<Component />
		) : (
			<Redirect to={{ pathname: '/' }} />
		)
	) : (
		<Redirect to={{ pathname: '/login' }} />
	);
}
