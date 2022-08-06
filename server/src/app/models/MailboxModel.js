const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Mailbox = new Schema({
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
    status_question: {
        type: 'string',
        required: true,
    },
    type_name: {
        type: 'string',
    },
    username_questioner: {
        type: 'string',
        required: true,
    },
    username_approver: {
        type: 'string',
    },
    username_respondent: {
        type: 'string',
    },
    createdAt: {
        type: 'Date',
        default: Date.now,
    },
    approvedAt: {
        type: 'Date',
        default: Date.now,
    },
    responsedAt: {
        type: 'Date',
        default: Date.now,
    },
    members_star:{
        type: Array,
    },
});

Mailbox.plugin(AutoIncrement, { inc_field: 'id_question' });

module.exports = mongoose.model('Mailbox', Mailbox);
