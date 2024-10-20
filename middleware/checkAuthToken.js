function checkAuthToken(req, res, next) {
    const authToken = req.cookies.authToken; 
    if (!authToken) {
        return res.redirect('/login');
    }
    next();
}
