const express = require('express');
const routerChatPage = express.Router();
const {
    getRooms
} = require('../database');
routerChatPage.get('/chat', (req,res)=>{
    let isThisRoomExist = getRooms();
    let roomExist = isThisRoomExist.find(room=> room.value === req.query.room)
    if(req.query.room != undefined && roomExist!= undefined){
        res.render('chat.ejs',{
            user:req.user,
            room:req.query.room
        })
    }else{
        res.redirect('/');
    }
  


})

module.exports = routerChatPage;