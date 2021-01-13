const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: 'http://localhost:3000'
});
const path = require("path");
const dayjs = require('dayjs');
const { nanoid } = require('nanoid');
const users = require('./users')();

const rooms = new Set()

const message = (username, text, id, to)  => {
    return {username, text, id, to, msgId: nanoid(10),time: dayjs().format("YYYY-MM-DDTHH:mm:ss.sssZ")}
};



io.on('connection',(socket) => {
    socket.on('joinChat', (data, callback) => {
        callback({
            userId: socket.id
        });
        users.add({
            id: socket.id,
            username: data.username,
            rooms: []
        });

        io.emit('updateUsersList', users.getAllUsers())

    });

    socket.on('joinRoom', (room, callback) => {
        const user = users.get(socket.id);
        socket.join(room.name)
        rooms.add(room.name)
        users.addRoom(socket.id,room.name)
        let userRooms = user.rooms
        let listOfAllRooms = [...rooms]
        socket.emit('newMessage',message('Admin',`Welcome to ${room.name} room, ${user.username}`, nanoid(6), room.name));
        

        //Sends to everybody except the user who just connected
        socket.broadcast.to(room.name).emit('newMessage',message( 'Admin',`${user.username} has joined the chat`, nanoid(6), room.name)); 

        io.emit("updateRoomsList", listOfAllRooms)

        callback({
            room,
            userRooms
        })
    })

    socket.on('chatMessage', (data) => {
        let {text,from, to, isPrivate} = data
        const user = users.get(data.from);
        if(user){
            if(!isPrivate) {
            io.to(to).emit('newMessage', message(user.username, text, from, to));
            }
        }
    });

    socket.on("private message", (anotherSocketId, msg) => {
        socket.to(anotherSocketId).emit("private message", socket.id, msg);
      });

    socket.on('leaveChat', ()  => {
        const user = users.remove(socket.id);
        if (user) {
            io.emit('updateUsersList', users.getAllUsers());
            let roomsOfUser = [...socket.rooms];
            roomsOfUser.forEach(room => {
                io.to(room).emit('newMessage', message('Admin',`${user.username} left the chat`, nanoid(6), room))
            });

        }
    });

    socket.on('disconnect', () => {
        const user = users.remove(socket.id);
        if (user) {
            io.emit('updateUsersList', users.getAllUsers());
            let roomsOfUser = user.rooms;
            roomsOfUser.forEach(room => {
                io.to(room).emit('newMessage', message('Admin',`${user.username} left the chat`, nanoid(6), room))
            });
            
        }
    });

});


// Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    
    app.use(express.static('client/build'));

    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;


http.listen(PORT, () => console.log(`Server is running on port ${PORT}`))