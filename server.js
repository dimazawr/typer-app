const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require("path");
const moment = require('moment');
const shortid = require('shortid');
const users = require('./users')();


const message = (username, text, id)  => {
    return {username, text, id, msgId: shortid.generate(),time: moment().format('MMM Do HH:MM')}
};



io.on('connection', (socket) => {
    
    socket.on('joinRoom', (data, callback) => {
        callback({
            userId: socket.id
        });

        socket.join(data.room);

        users.add({
            id: socket.id,
            username: data.username,
            room: data.room
        });

        io.to(data.room).emit('updateUsersList', users.getByRoom(data.room));

        socket.emit('newMessage',message('Admin',`Welcome to the TyperApp, ${data.username}`));

        // Sends to everybody except the user who just connected
        socket.broadcast.to(data.room).emit('newMessage',message( 'Admin',`${data.username} has joined the chat`));
    });

    socket.on('chatMessage', (data) => {
        const user = users.get(data.id);
        if(user){
            io.to(user.room).emit('newMessage', message(user.username, data.text, data.id));
        }
    });

    socket.on('leaveRoom', id  => {
        const user = users.remove(id);
        if (user) {
            io.to(user.room).emit('updateUsersList', users.getByRoom(user.room));
            io.to(user.room).emit('newMessage', message('Admin',`${user.username} left the chat`))
        }
    });

    socket.on('disconnect', () => {
        const user = users.remove(socket.id);
        if (user) {
            io.to(user.room).emit('updateUsersList', users.getByRoom(user.room));
            io.to(user.room).emit('newMessage', message('Admin',`${user.username} left the chat`))
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