const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Conversation = Schema({
    id_conversation: {
        type: Number,
    },
    members: {
        type: Array,
    },
});

Conversation.plugin(AutoIncrement, { inc_field: 'id_conversation' });

module.exports = mongoose.model('Conversation', Conversation);
