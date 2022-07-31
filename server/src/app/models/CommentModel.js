const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = Schema({
    comment: {
        type: 'string',
        required: [true, 'Vui lòng không bỏ trống'],
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

module.exports = mongoose.model('Comment', Comment);
