const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: 'string',
            minlength: 5,
            maxlength: 20,
            required: true,
            unique: [true, 'Tài khoản đã tồn tại!!!'],
        },
        password: {
            type: 'string',
            minlength: 5,
            maxlength: 20,
            required: true,
        },
        status_name: {
            type: 'string',
            default: 'Đang hoạt động',
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

module.exports = mongoose.model('User', User);
