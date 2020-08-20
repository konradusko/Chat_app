const express = require('express');
const routerLoginPage = express.Router();
const passport = require('passport');


routerLoginPage.get('/login', (req, res) => {
    res.render('login.ejs')
    
})
routerLoginPage.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
module.exports = routerLoginPage;