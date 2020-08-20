if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require("path");
const flash = require('express-flash');
const express_session = require('express-session');
const passport = require('passport');
const method_override = require('method-override');
const routerHome = require('./routers/HomePage');
const routerLogin = require('./routers/LoginPage');
const routerRegister = require('./routers/RegisterPage');
const routerChat = require('./routers/chat')
const formatMessage = require('./utils/message')
const bot = 'Bartek Bot'
const {
    getUserById,
    getUserBySocketId,
    addUserToRoom,
    removeUserFromRoomById,
    addMessageToRoom,
} = require('./database');
app.use(express.static(path.join(__dirname, "public")));
const {
    initPassport
} = require('./passport_config');

initPassport(passport);
//middleWare
app.set('view engine', 'ejs'); //  
app.use(express.urlencoded({
    extended: false
}))
app.use(flash());
app.use(express_session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(method_override('_method'))
//routing
app.get('/', checkAuthenticated, routerHome)
app.get('/login', checkNotAuthenticated, routerLogin);
app.post('/login', checkNotAuthenticated, routerLogin);
app.get('/register', checkNotAuthenticated, routerRegister)
app.post('/register', checkNotAuthenticated, routerRegister)
app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
})
app.get('/chat', checkAuthenticated, routerChat)

//socket

io.on('connection', socket => {
    console.log('connected ')
    socket.on('joinRoom', ({
        obj
    }) => {
        let user = getUserById(obj.userID);
        user.socketId = socket.id
        user.chatRoom = obj.room;
        addUserToRoom(user)
        socket.join(user.chatRoom);
        // //message from server that you join
        socket.emit('MessageFromServer', formatMessage(`Welcome on Konradusko chat , you join ${user.chatRoom} room `, bot));
        // //brodcast
        socket.broadcast.to(user.chatRoom).emit('MessageFromServer', formatMessage(`${user.name} has join to ${user.chatRoom} room`, bot))
    })
    socket.on('disconnect', () => {
        const user = getUserBySocketId(socket.id)
        if (user) {
            console.log('se poszedl')
            io.to(user.chatRoom).emit('MessageFromServer', formatMessage(`${user.name} has Left  ${user.chatRoom} room`, bot))
            removeUserFromRoomById(user);
            user.socketId = null;
            user.chatRoom = null;
        }
    })
    //listen for message from client
    socket.on('MessageFromClient',(message)=>{
        const user = getUserBySocketId(socket.id);
        addMessageToRoom(user,message);
        io.to(user.chatRoom).emit('MessageFromServer',formatMessage(message,user.name))
    })
})



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {

        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next();
}

http.listen(3000, () => {
    console.log('listening')
})