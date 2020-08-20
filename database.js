const formatMessage = require('./utils/message')
users = [{
    id: '1597493405870',
    name: 'xd@xd',
    email: 'xd@xd',
    password: '$2b$10$4mUf0NuKq/9qmAPX8..Ob.3UWS12kSsTKQ0Rw2jQoK2DkYwmty.XO',
    socketId: null,
    chatRoom: null
}];
let pythonRoom = {
    usersInRoom: [],
    messagesInRoom: []

}
let javaRoom = {
    usersInRoom: [],
    messagesInRoom: []

}
let javascriptRoom = {
    usersInRoom: [],
    messagesInRoom: []

}
//// rooms
rooms = [{
        value: 'python',
        room:pythonRoom
    },
    {
        value: "java",
        room:javaRoom
    },
    {
        value: "javascript",
        room:javascriptRoom
    }

]


function addUser(id, name, email, password) {
    users.push({
        id,
        name,
        email,
        password,
        socketId: null,
        chatRoom: null
    })
    console.log(users)
}

function getUserById(id) {
    return users.find(user => user.id === id)
}

function getUserBySocketId(id) {
    return users.find(user => user.socketId === id)
}

function getUserByEmail(email) {
    return users.find(user => user.email === email)
}


function getRooms() {
    return rooms;
}

function addUserToRoom(user) {
    let currentRoom = rooms.find(rom => rom.value === user.chatRoom);
    currentRoom.room.usersInRoom.push(user);
}

function removeUserFromRoomById(user) {
    let currentRoom = rooms.find(rom => rom.value === user.chatRoom);
    let index = currentRoom.room.usersInRoom;
    index.findIndex(us => us.id === user.id);
    if (index != -1) {
        return index.splice(index, 1)[0];
    }
}
function addMessageToRoom(user, message) {
    


    if (user.chatRoom === 'python') {
        pythonRoom.messagesInRoom.push(formatMessage(message, user));
        console.log(pythonRoom.messagesInRoom[0].userName.name)
    } else if (user.chatRoom === 'java') {
        javaRoom.messagesInRoom.push(formatMessage(message, user));
    } else if (user.chatRoom === "javascript") {
        javascriptRoom.messagesInRoom.push(formatMessage(message, user));
    }
}
function takeAllUserFromRoom(user){
    if (user.chatRoom === 'python') {
        pythonRoom.messagesInRoom.push(formatMessage(message, user));
        console.log(pythonRoom.messagesInRoom[0].userName.name)
    } else if (user.chatRoom === 'java') {
        javaRoom.messagesInRoom.push(formatMessage(message, user));
    } else if (user.chatRoom === "javascript") {
        javascriptRoom.messagesInRoom.push(formatMessage(message, user));
    }
}

module.exports = {
    addUser,
    getUserById,
    getUserByEmail,
    getRooms,
    getUserBySocketId,
    addUserToRoom,
    removeUserFromRoomById,
    addMessageToRoom,
    

};