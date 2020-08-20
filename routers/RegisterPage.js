const express = require('express');
const routerRegisterPage = express.Router();
const {
    addUser
} = require('../database');
const bcrypt = require('bcrypt');
routerRegisterPage.get('/register',  (req, res) => {
    res.render('register.ejs')
})

routerRegisterPage.post('/register', async (req, res) => {
    console.log(req.body.password)

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        addUser(Date.now().toString(), req.body.name, req.body.email, hashedPassword);
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
    }
})

module.exports = routerRegisterPage;