const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        image: { type: String },
        title: { type: String },
        price: { type: Number },
        star: { type: Number, default: 5 },
        time: { type: String },
        category: { type: String },
        popular: { type: String }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', ProductSchema);
