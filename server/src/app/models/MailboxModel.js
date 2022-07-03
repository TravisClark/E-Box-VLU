const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Mailbox = new Schema(
    {
        id_question: {
            type: Number,
        },
        question: {
            type: 'string',
            required: true,
        },
        answer: {
            type: 'string',
        },
        status: {
            type: 'string',
            required: true,
        },
        type_name: {
            type: 'string',
        },
        username_question: {
            type: 'string',
            required: true,
        },
        username_censor: {
            type: 'string',
        },
        username_reply: {
            type: 'string',
        },
    },
    {
        timestamps: true,
    },
);

Mailbox.plugin(AutoIncrement, { inc_field: 'id_question' });

module.exports = mongoose.model('Mailbox', Mailbox);
