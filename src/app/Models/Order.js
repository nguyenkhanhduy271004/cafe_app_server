const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        orderId: { type: String, required: true, unique: true },
        clientName: { type: String },
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        total: { type: Number },
        paymentMethod: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Order', OrderSchema);
