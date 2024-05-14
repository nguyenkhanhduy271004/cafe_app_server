const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Email = new Schema(
    {
        resetPassword: { type: String }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Email', Email);
