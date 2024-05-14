const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        userId: { type: Number },
        username: { type: String, required: true },
        imageUrl: { type: String },
        fullname: { type: String, default: "" },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'client' },
        isOnline: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    }
);
UserSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('User', UserSchema);
