module.exports = {
	isLoggedIn : (req, res, next) => {

		console.log("user: ", req.session.user_id);
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