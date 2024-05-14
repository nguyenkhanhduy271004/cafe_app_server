const Order = require('../Models/Order')
const Cart = require('../Models/Cart')
class OrderController {

    async setPaymentMethod(req, res) {
        const username = req.query.username;
        const paymentMethod = req.query.paymentMethod;
        try {
            if (username) {
                const order = await Order.findOne({ clientName: username }).sort({ createdAt: -1 });
                if (order) {
                    order.paymentMethod = paymentMethod;
                    order.save();
                    res.status(200).send({ message: 'save payment method successfully' });
                } else {
                    res.status(200).send({ message: 'save payment method failed' });
                }
            } else {
                res.status(400).send({ error: 'Username not provided.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error.' });
        }
    }

    async saveAddressForCart(req, res) {
        const username = req.query.username;
        const { name, phone, address } = req.body;
        try {
            if (username) {
                const latestOrder = await Order.findOne({ clientName: username }).sort({ createdAt: -1 });
                const orderId = latestOrder.orderId
                if (latestOrder) {
                    await Order.updateMany({ orderId: orderId }, { $set: { name: name, phone: phone, address: address } });
                    res.status(200).send({ error: 'Save address for user successfully!' });
                } else {
                    res.status(400).send({ error: 'Save address for user failed!' });
                }
            } else {
                res.status(400).send({ error: 'Missing username!' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal Server Error!' });
        }
    }

    async getAddressForBill(req, res) {
        const _id = req.query._id;
        try {
            const product = await Cart.findOne({ _id: _id });
            if (product) {
                const orderId = product.orderId;
                const order = await Order.findOne({ orderId: orderId });
                if (order) {
                    res.json({
                        name: order.name,
                        phone: order.phone,
                        address: order.address
                    });
                } else {
                    res.status(404).json({ error: 'Order not found' });
                }

            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal Server Error!' });
        }
    }

    async getTotalPriceForBill(req, res) {
        const username = req.query.username;
        try {
            let products;
            if (username) {
                const order = await Order.findOne({ clientName: username }).sort({ createdAt: -1 });
                if (order) {
                    const orderId = order.orderId;
                    products = await Cart.find({ user: username, orderId: orderId });
                    if (products) {
                        let totalPrice = 0;
                        products.forEach(cart => {
                            totalPrice += parseFloat(cart.price) * parseFloat(cart.quantity);
                        });
                        res.json({ totalPrice });
                    } else {
                        res.json({ message: "Cannot find products" })
                    }
                } else {
                    res.status(404).json({ message: 'Cannot find orderId' });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new OrderController();
