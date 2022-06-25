const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const NewSchema = mongoose.Schema;

const Role = new NewSchema({
    id_role: { type: Number },
    role_name: {
        type: 'string',
        maxlength: 20,
        required: true,
        unique: true,
    },
});

Role.plugin(AutoIncrement, { inc_field: 'id_role' });

module.exports = mongoose.model('Role', Role);
