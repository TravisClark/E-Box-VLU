const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Notification = Schema({
    id_notification: {
        type: Number,
    },
    question: {
        type: 'string',
        required: true,
    },
    notification: {
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

Notification.plugin(AutoIncrement, { inc_field: 'id_notification' });

module.exports = mongoose.model('Notification', Notification);
