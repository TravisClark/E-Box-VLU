const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

const route = require('./routes/index');

const URI_DATABASE = process.env.URI_DATABASE;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

mongoose
    .connect(URI_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log('err', err);
    });

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    }
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan('common'));

//Connecting router
route(app);

const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

//connect socket
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        credentials:true,
        allowedHeaders: ["access-token"],
    },
});

let users = [];
let users_question = [];

//message
const addUser = (username, socketId, id_conversation) => {
    !users.some((user) => user.username === username) &&
        users.push({ username, socketId, id_conversation });
    var info_user = users.find((user) => user.username === username);
    if (info_user != null && info_user.id_conversation != id_conversation) {
        users = users.filter((user) => user.username !== username);
        users.push({ username, socketId, id_conversation });
    }
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
    return users.find((user) => user.username === username);
};

//comment
const addUser_question = (username, socketId, id_question) => {
    !users_question.some((user) => user.username === username) &&
        users_question.push({ username, socketId, id_question });
    var info_user = users_question.find((user) => user.username === username);
    if (info_user != null && info_user.id_question != id_question) {
        users_question = users_question.filter(
            (user) => user.username !== username,
        );
        users_question.push({ username, socketId, id_question });
    }
};

const removeUser_question = (socketId) => {
    users_question = users_question.filter(
        (user) => user.socketId !== socketId,
    );
};

const getUsers_question = (id_question) => {
    return users_question.filter((user) => user.id_question === id_question);
};

io.on('connection', (socket) => {
    //connected successfully
    console.log('Connected to socket');
    //get username and socketId from user
    socket.on('addUser', ({ username, id_conversation }) => {
        addUser(username, socket.id, id_conversation);
        io.emit('getUsers', users);
    });
    //send and get message
    socket.on(
        'sendMessage',
        ({ username_sender, username_receiver, message }) => {
            const info_username_sender = getUser(username_sender);
            const info_username_receiver = getUser(username_receiver);
            var data_message = message.replace(/\s+/g, '');
            if (
                !(message === null || data_message === '') &&
                (info_username_receiver !== undefined &&
                info_username_sender.id_conversation === info_username_receiver.id_conversation)
            ) {
                io.to(info_username_receiver.socketId).emit('getMessage', {
                    username_sender,
                    message,
                });
            }
        },
    );

    //get username and socketId from user in question
    socket.on('addUser_question', ({ username, id_question }) => {
        addUser_question(username, socket.id, id_question);
        io.emit('getUsers_question', users_question);
    });
    //send and get comment
    socket.on('sendComment', ({ username, id_question, comment }) => {
        const list_username = getUsers_question(id_question);
        var data_comment = comment.replace(/\s+/g, '');
        if (!(comment === null || data_comment === '')) {
            for (let i = 0; i < list_username.length; i++) {
                if (list_username[i].username !== username) {
                    io.to(list_username[i].socketId).emit('getComment', {
                        username,
                        comment,
                    });
                }
            }
        }
    });
    //when disconnect
    socket.on('disconnect', () => {
        console.log('disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
        removeUser_question(socket.id);
        io.emit('getUsers_question', users_question);
    });
});

module.exports = app;
