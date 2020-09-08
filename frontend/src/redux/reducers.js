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

function loggedInReducer(state = false, action) {
	switch (action.type) {
		case 'SIGN_IN':
			return true;
		case 'SIGN_OUT':
			return false;
		default:
			return state;
	}
}

export default combineReducers({
	isNavOpen: navOpenReducer,
	isLoggedIn: loggedInReducer,
	isEditPanelOpen: editPanelOpenReducer
});
