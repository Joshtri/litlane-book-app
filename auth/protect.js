module.exports = {
	isLoggedIn : (req, res, next) => {

		console.log("user: ", req.session.adminId);
		if (!req.session.adminId)
			res.redirect('/login')
		else
			next()

	},
	redirectIfLoggedIn : (req, res, next) => {

		if (req.session.adminId)
			res.redirect('/dashboardUser')
		else
			next()

	}
}