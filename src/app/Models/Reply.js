const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReplySchema = new Schema(
    {
        name: { type: String, required: true },
        phoneNumber: { type: String },
        email: { type: String },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Reply', ReplySchema);
