const formatMessage = require('./utils/message')
users = [{
    id: '1597493405870',
    name: 'xd@xd',
    email: 'xd@xd',
    password: '$2b$10$4mUf0NuKq/9qmAPX8..Ob.3UWS12kSsTKQ0Rw2jQoK2DkYwmty.XO',
    socketId: null,
    chatRoom: null
},
{
    id: '1598286848691',
    name: 'q@q',
    email: 'q@q',
    password: '$2b$10$IEoPd.9upvBYLQ9Km7aFSOiQzt3F4HyRSvlEb2hcvudeFmRbeu7EO',
    socketId: null,
    chatRoom: null
  }];

//// rooms
rooms = [{
        value: 'python',
        room: {
            usersInRoom: [],
            messagesInRoom: []
        }
    },
    {
        value: "java",
        room: {
            usersInRoom: [],
            messagesInRoom: []
        
        }
    },
    {
        value: "javascript",
        room: {
            usersInRoom: [],
            messagesInRoom: []
        
        }
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
    let roomsValue = [];
    rooms.forEach(element => {
        roomsValue.push({value:element.value})
    });
    return roomsValue;
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
    let currentRoom = rooms.find(rom => rom.value === user.chatRoom);
    currentRoom.room.messagesInRoom.push(formatMessage(message, user))
}

function takeAllUserFromRoom(user) {
    let currentRoom = rooms.find(rom => rom.value === user.chatRoom);
    return currentRoom.room.usersInRoom;

}

function checkIfThisNameHasBeenUsed(name) {
    let isUsed = users.find(user => user.name === name);
    if (isUsed === undefined) {
        return false;
    } else {
        return true;
    }
}

function checkIfThisEmailHasBeenUsed(email) {
    let isUsed = users.find(user => user.email === email);
    if (isUsed === undefined) {
        return false;
    } else {
        return true;
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
    takeAllUserFromRoom,
    checkIfThisNameHasBeenUsed,
    checkIfThisEmailHasBeenUsed


};