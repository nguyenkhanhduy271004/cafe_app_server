const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        _id: { type: Number },
        orderId: { type: String },
        user: { type: String },
        image: { type: String },
        title: { type: String },
        price: { type: Number },
        quantity: { type: Number, default: 1 },
        total: { type: Number },
        orderedAt: { Date },
        options: [{ type: String }],
        paymentMethod: { type: String },
        starEvaluate: { type: Number },
        contentEvaluate: { type: String },
        isConfirmed: { type: Boolean, default: false },
        isOrdered: { type: Boolean, default: false },
        isCompleted: { type: Boolean, default: false }
    },
    {
        _id: false,
        timestamps: true,
    }
);
CartSchema.plugin(AutoIncrement);
module.exports = mongoose.model('Cart', CartSchema);
