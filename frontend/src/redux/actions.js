export function toggleNavOpen() {
	return {
		type: 'TOGGLE_NAV'
	};
}

export function toggleEditPanel() {
	return {
		type: 'TOGGLE_EDIT_PANEL'
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
			role: role
		}
	};
}
