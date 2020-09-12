import { combineReducers } from 'redux';

function navOpenReducer(state = false, action) {
	switch (action.type) {
		case 'TOGGLE_NAV':
			return !state;
		default:
			return state;
	}
}

function editPanelReducer(state = false, action) {
	switch (action.type) {
		case 'TOGGLE_EDIT_PANEL':
			if (state) return false;
			if (action.payload && action.payload.product) {
				return action.payload.product;
			} else return 'new';

		default:
			return state;
	}
}

function loggedInReducer(state = 'loading', action) {
	switch (action.type) {
		case 'LOGIN':
			return true;
		case 'LOGOUT':
			return false;
		default:
			return state;
	}
}

function userRoleReducer(state = null, action) {
	switch (action.type) {
		case 'SET_ROLE':
			return action.payload.role;
		default:
			return state;
	}
}

function productsReducer(state = 'loading', action) {
	switch (action.type) {
		case 'SET_PRODUCTS':
			return action.payload.products;
		default:
			return state;
	}
}

function adminStatsReducer(state = 'loading', action) {
	switch (action.type) {
		case 'SET_STATS':
			return action.payload.stats;
		default:
			return state;
	}
}

export default combineReducers({
	isNavOpen: navOpenReducer,
	isAuthenticated: loggedInReducer,
	editPanelState: editPanelReducer,
	userRole: userRoleReducer,
	products: productsReducer,
	adminStats: adminStatsReducer
});
