const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const AddressSchema = new Schema(
    {
        username: { type: String },
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        isSelected: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Address', AddressSchema);
