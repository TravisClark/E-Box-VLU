const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Inbox = Schema({
    message: {
        type: 'string',
        required: true,
    },
    username_sender: {
        type: 'string',
        required: true,
    },
    username_receiver: {
        type: 'string',
        required: true,
    },
    createdAt: {
        type: 'Date',
        default: Date.now,
    },
});

module.exports = mongoose.model('Inbox', Inbox);
