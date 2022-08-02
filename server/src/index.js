const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

const route = require('./routes/index');

const URI_DATABASE = process.env.URI_DATABASE || 8080;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

//Connecting router
route(app);

//connect socket
const io = require('socket.io')(8900, {
    cors: {
        origin: 'https://localhost:3000',
    }
});

io.on('connection', (socket)=>{
    console.log('Connected to socket');
    io.to().emit("welcome","hello this is socket server!");
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

module.exports = app;
