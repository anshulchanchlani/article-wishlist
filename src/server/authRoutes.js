const passport = require('passport')

module.exports = app => {
    app.get('/logout', (req, res) => {

        req.logout();
        res.redirect('/');
    });

    app.post('/login', passport.authenticate('local', { failureRedirect: '/login'}), (req, res) => {
        res.status(200).send(req.body.username)
    })
}