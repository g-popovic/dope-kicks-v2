const { ROLES } = require('./config/data');

function authUser(req, res, next) {
	if (req.user == null) {
		return res.sendStatus(401);
	}
	next();
}

function authAdmin(req, res, next) {
	if (req.user == null || req.user.role !== ROLES.ADMIN) {
		return res.sendStatus(401);
	}
	next();
}

module.exports = {
	authUser,
	authAdmin
};
