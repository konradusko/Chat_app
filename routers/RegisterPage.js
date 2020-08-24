const express = require('express');
const routerRegisterPage = express.Router();
const {
    addUser,
    checkIfThisNameHasBeenUsed,
    checkIfThisEmailHasBeenUsed
} = require('../database');
const bcrypt = require('bcrypt');
routerRegisterPage.get('/register',  (req, res) => {
    res.render('register.ejs')
})

routerRegisterPage.post('/register', async (req, res) => {

    try {
        //true zajety false - nie zajety
        // if(!checkIfThisEmailHasBeenUsed(req.body.email) && !checkIfThisNameHasBeenUsed(req.body.name) ){
        //     const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //     addUser(Date.now().toString(), req.body.name, req.body.email, hashedPassword);
        //     res.redirect('/login')
        // }else if(checkIfThisEmailHasBeenUsed(req.body.email)){
        // //    res.send({message:'This email is used!'})
        // //    res.render('register.ejs',{
        // //     message:'This email is used!'
        // // })7
        // res.json({message:"This email is used!"})
        // }else if(checkIfThisNameHasBeenUsed(req.body.name)){
        //     res.send({message:'This name is used!'})
        // }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        addUser(Date.now().toString(), req.body.name, req.body.email, hashedPassword);
        res.redirect('/login')

    } catch (error) {
        res.redirect('/register')
    }
})

module.exports = routerRegisterPage;