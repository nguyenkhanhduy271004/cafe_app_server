const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscountSchema = new Schema(
    {
        valueDiscount: { type: Number },
        conditionDiscount: { type: String },
        conditionTotal: { type: Number }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Discount', DiscountSchema);
