const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const NewSchema = mongoose.Schema;

const Status = new NewSchema({
    id_status: { type: Number },
    status_name: {
        type: 'string',
        required: true,
        default: 'Đang hoạt động',
    },
});

Status.plugin(AutoIncrement, { inc_field: 'id_status' });

module.exports = mongoose.model('Status', Status);
