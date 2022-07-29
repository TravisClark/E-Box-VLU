const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Star = Schema({
    id_start: {
        type: Number,
        required: true,
    },
    username: {
        type: 'string',
        required: true,
    },
    id_question: {
        type: Number,
        required: true,
    },
});

Star.plugin(AutoIncrement, { inc_field: 'id_start' });

module.exports = mongoose.model('Star', Star);
