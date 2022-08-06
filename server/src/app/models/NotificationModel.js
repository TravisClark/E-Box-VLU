const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Notification = Schema({
    id_notification: {
        type: Number,
    },
    id_question: {
        type: Number,
        required: [true, 'cần có id_question'],
    },
    status_notification: {
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
    watched: {
        type: Boolean,
        default: false,
    }
});

Notification.plugin(AutoIncrement, { inc_field: 'id_notification' });

module.exports = mongoose.model('Notification', Notification);
