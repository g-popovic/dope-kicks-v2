export function toggleNavOpen() {
	return {
		type: 'TOGGLE_NAV'
	};
}

export function toggleEditPanel(product) {
	return {
		type: 'TOGGLE_EDIT_PANEL',
		payload: {
			product
		}
	};
}

export function authLogin() {
	return {
		type: 'LOGIN'
	};
}

export function authLogout() {
	return {
		type: 'LOGOUT'
	};
}

export function setRole(role) {
	return {
		type: 'SET_ROLE',
		payload: {
			role
		}
	};
}

export function setProducts(products) {
	return {
		type: 'SET_PRODUCTS',
		payload: {
			products
		}
	};
}

export function setAdminStats(stats) {
	return {
		type: 'SET_STATS',
		payload: {
			stats
		}
	};
}
