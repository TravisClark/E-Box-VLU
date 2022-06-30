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
        user_name_question: {
            type: 'string',
            maxlength: 20,
            required: true,
        },
        user_name_censor: {
            type: 'string',
            maxlength: 20,
        },
        user_name_answer: {
            type: 'string',
            maxlength: 20,
        },
    },
    {
        timestamps: true,
    },
);

Mailbox.plugin(AutoIncrement, { inc_field: 'id_question' });

module.exports = mongoose.model('Mailbox', Mailbox);
