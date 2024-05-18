const Order = require('../Models/Order');
const Cart = require('../Models/Cart');

class OrderController {

    setPaymentMethod(req, res) {
        const username = req.query.username;
        const paymentMethod = req.query.paymentMethod;

        if (!username) {
            return res.status(400).send({ error: 'Username not provided.' });
        }

        Order.findOne({ clientName: username }).sort({ createdAt: -1 }).exec()
            .then(order => {
                if (!order) {
                    return res.status(200).send({ message: 'Save payment method failed' });
                }
                order.paymentMethod = paymentMethod;
                return order.save();
            })
            .then(() => {
                res.status(200).send({ message: 'Save payment method successfully' });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ error: 'Internal server error.' });
            });
    }

    setValueDiscount(req, res) {
        const username = req.query.username;
        const valueDiscount = req.query.valueDiscount;

        if (!username) {
            return res.status(400).send({ error: 'Username not provided.' });
        }

        Order.findOne({ clientName: username }).sort({ createdAt: -1 }).exec()
            .then(order => {
                if (!order) {
                    return res.status(200).send({ message: 'Save payment method failed' });
                }
                order.valueDiscount = valueDiscount;
                return order.save();
            })
            .then(() => {
                res.status(200).send({ message: 'Save payment method successfully' });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ error: 'Internal server error.' });
            });
    }

    saveAddressForCart(req, res) {
        const username = req.query.username;
        const { name, phone, address } = req.body;

        if (!username) {
            return res.status(400).send({ error: 'Missing username!' });
        }

        Order.findOne({ clientName: username }).sort({ createdAt: -1 }).exec()
            .then(latestOrder => {
                if (!latestOrder) {
                    return res.status(400).send({ error: 'Save address for user failed!' });
                }
                const orderId = latestOrder.orderId;
                return Order.updateMany({ orderId: orderId }, { $set: { name: name, phone: phone, address: address } });
            })
            .then(() => {
                res.status(200).send({ message: 'Save address for user successfully!' });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error!' });
            });
    }

    getAddressForBill(req, res) {
        const _id = req.query._id;

        Cart.findOne({ _id: _id }).exec()
            .then(product => {
                if (!product) {
                    return res.status(404).json({ error: 'Product not found' });
                }
                const orderId = product.orderId;
                return Order.findOne({ orderId: orderId }).exec();
            })
            .then(order => {
                if (!order) {
                    return res.status(404).json({ error: 'Order not found' });
                }
                res.json({
                    name: order.name,
                    phone: order.phone,
                    address: order.address
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ error: 'Internal Server Error!' });
            });
    }

    getTotalPriceForBill(req, res) {
        const username = req.query.username;

        if (!username) {
            return res.status(400).json({ error: 'Missing username!' });
        }

        Order.findOne({ clientName: username }).sort({ createdAt: -1 }).exec()
            .then(order => {
                if (!order) {
                    return res.status(404).json({ message: 'Cannot find orderId' });
                }
                const orderId = order.orderId;
                return Cart.find({ user: username, orderId: orderId }).exec();
            })
            .then(products => {
                if (!products || products.length === 0) {
                    return res.json({ message: 'Cannot find products' });
                }
                let totalPrice = 0;
                products.forEach(cart => {
                    totalPrice += parseFloat(cart.price) * parseFloat(cart.quantity);
                });
                res.json({ totalPrice });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    getInforForBill(req, res) {
        const username = req.query.username;

        if (!username) {
            return res.status(400).json({ error: 'Missing username!' });
        }

        Order.findOne({ clientName: username }).sort({ createdAt: -1 }).exec()
            .then(order => {
                if (!order) {
                    return res.status(404).json({ message: 'Cannot find orderId' });
                } else {
                    res.json(order);
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    getInforForBill1(req, res) {
        const _id = req.query._id;

        if (!_id) {
            return res.status(400).json({ error: 'Missing cartId!' });
        }

        Cart.findOne({ _id: _id })
            .then(cart => {
                if (!cart) {
                    return res.status(404).json({ message: 'Cannot find cart with the given ID' });
                }

                const orderId = cart.orderId;

                if (!orderId) {
                    return res.status(404).json({ message: 'Cannot find orderId in the cart' });
                }

                return Order.findOne({ orderId: orderId });
            })
            .then(order => {
                if (!order) {
                    return res.status(404).json({ message: 'Cannot find order with the given orderId' });
                }

                res.json(order);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
}

module.exports = new OrderController();
