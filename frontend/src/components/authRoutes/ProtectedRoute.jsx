import React from 'react';
import { Redirect } from 'react-router-dom';
import { ROLES } from '../../utils/data';

import { useSelector } from 'react-redux';

export function AuthRoute(props) {
	const userRole = useSelector(state => state.userRole);
	const Component = props.component;

	return userRole === 'loading' ? (
		<h1>Loading...</h1>
	) : userRole ? (
		<Component />
	) : (
		<Redirect to={{ pathname: '/login' }} />
	);
}

export function UnauthRoute(props) {
	const userRole = useSelector(state => state.userRole);
	const Component = props.component;

	return userRole === 'loading' ? (
		<h1>Loading...</h1>
	) : !userRole ? (
		<Component />
	) : (
		<Redirect to={{ pathname: '/' }} />
	);
}

export function AdminRoute(props) {
	const userRole = useSelector(state => state.userRole);
	const Component = props.component;

	return userRole === 'loading' ? (
		<h1>Loading...</h1>
	) : userRole ? (
		userRole === ROLES.ADMIN || userRole === ROLES.MASTER ? (
			<Component />
		) : (
			<Redirect to={{ pathname: '/' }} />
		)
	) : (
		<Redirect to={{ pathname: '/login' }} />
	);
}
