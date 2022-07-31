const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const NewSchema = mongoose.Schema;

const Status = new NewSchema({
    id_status: { type: Number },
    status_account: {
        type: 'string',
        required: [true, 'Loại câu hỏi không được bỏ trống'],
        default: 'Đang hoạt động',
    },
});

Status.plugin(AutoIncrement, { inc_field: 'id_status' });

module.exports = mongoose.model('Status', Status);
