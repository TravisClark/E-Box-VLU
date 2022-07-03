const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const User = new Schema(
    {
        id_user: {
            type: Number,
        },
        username: {
            type: 'string',
            maxlength: 20,
            required: true,
            unique: true,
        },
        password: {
            type: 'string',
            maxlength: 20,
            required: true,
        },
        role_name: {
            type: 'string',
            required: true,
            default: 'Sinh vien',
        },
    },
    {
        timestamps: true,
    },
);

User.plugin(AutoIncrement, { inc_field: 'id_user' });

module.exports = mongoose.model('User', User);
