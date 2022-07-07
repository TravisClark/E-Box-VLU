const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Type = Schema({
    id_type: {
        type: Number,
    },
    type_name: {
        type: 'string',
        required: true,
    },
});

Type.plugin(AutoIncrement, { inc_field: 'id_type' });

module.exports = mongoose.model('Type', Type);
