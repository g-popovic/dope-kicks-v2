import { combineReducers } from 'redux';

function navOpenReducer(state = false, action) {
	switch (action.type) {
		case 'TOGGLE_NAV':
			return !state;
		default:
			return state;
	}
}

function editPanelOpenReducer(state = false, action) {
	switch (action.type) {
		case 'TOGGLE_EDIT_PANEL':
			return !state;
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

export default combineReducers({
	isNavOpen: navOpenReducer,
	isAuthenticated: loggedInReducer,
	isEditPanelOpen: editPanelOpenReducer,
	userRole: userRoleReducer
});
