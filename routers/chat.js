const express = require('express');
const routerChatPage = express.Router();

routerChatPage.get('/chat', (req,res)=>{
    res.render('chat.ejs',{
        user:req.user,
        room:req.query.room
    })
    

})

module.exports = routerChatPage;