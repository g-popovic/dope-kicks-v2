const { ROLES } = require('./config/data');

function authUser(req, res, next) {
	if (req.user == null) {
		res.sendStatus(401);
		return;
	}
	next();
}

function authAdmin(req, res, next) {
	if (req.user.role !== ROLES.ADMIN) {
		res.sendStatus(401);
		return;
	}
	next();
}

module.exports = {
	authUser,
	authAdmin
};
