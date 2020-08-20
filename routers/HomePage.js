const express = require('express');
const routerHomePage = express.Router();
const {
    getRooms
} = require('../database');

routerHomePage.get('/', (req, res) => {
    res.render('index.ejs', {
        user: req.user.name,
        rooms: getRooms()

    })


    // console.log(req.user)
    // console.log(req.session)
})

module.exports = routerHomePage;