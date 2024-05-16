const Cart = require('../Models/Cart');
const Order = require('../Models/Order');
const uuid = require('uuid');
const { format } = require('date-fns');

function generateOrderId() {
    return uuid.v4();
}

async function isOrderIdExist(orderId) {
    const order = await Order.findOne({ orderId: orderId }).exec();
    return order !== null;
}

async function generateUniqueOrderId() {
    let orderId = generateOrderId();
    while (await isOrderIdExist(orderId)) {
        orderId = generateOrderId();
    }
    return orderId;
}

class CartController {

    async getProductsInCart(req, res) {
        const username = req.query.username;
        try {
            let products;
            if (username) {
                products = await Cart.find({ user: username, isOrdered: false });
            }
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(400).send({ error: 'ERROR!' });
        }
    }

    async setOrderIdProduct(req, res) {
        const username = req.query.username;
        try {
            if (username) {
                const orderId = await generateUniqueOrderId();
                await Cart.updateMany(
                    { user: username, isOrdered: false },
                    { $set: { orderId: orderId } }
                );
                const newOrder = new Order({
                    orderId: orderId,
                    clientName: username,
                });
                newOrder.save();
                res.status(200).json({ message: 'Updated successfully', orderId: orderId });
            } else {
                res.status(400).send({ error: 'Username not provided.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error.' });
        }
    }

    async setOrdered(req, res) {
        const username = req.query.username;
        try {
            if (username) {
                const currentTime = new Date();
                const formattedTime = format(currentTime, "dd/MM/yyyy HH:mm");
                await Cart.updateMany(
                    { user: username, isOrdered: false },
                    { $set: { isOrdered: true, orderedAt: formattedTime } }
                );
                res.status(200).send({ message: 'isOrdered set to true for all products.', orderedAt: formattedTime });
            } else {
                res.status(400).send({ error: 'Username not provided.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error.' });
        }
    }

    async receiveOrder(req, res) {
        const _id = req.query._id;
        try {
            const product = await Cart.findOne({ _id: _id });
            const orderId = product.orderId;
            await Cart.updateMany({ orderId: orderId }, { $set: { isCompleted: true } });
            res.status(200).send({ message: 'isCompleted set to true for all products.' });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error.' });
        }
    }


    async getProductsInProcessing(req, res) {
        const username = req.query.username;
        try {
            let products = [];
            if (username) {
                products = await Cart.find({ user: username, isOrdered: true, isCompleted: false }).sort({ createdAt: -1 });
            }
            res.json(products);
        } catch (err) {
            console.error(err);
            if (!res.headersSent) {
                res.status(400).send({ error: 'ERROR!' });
            }
        }
    }

    async getProductsInProcessingForStaff(req, res) {
        try {
            let products;
            products = await Cart.find({ isOrdered: true, isCompleted: false });
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(400).send({ error: 'ERROR!' });
        }
    }

    async getProductsInTracking(req, res) {
        const username = req.query.username;
        const _id = req.query._id;
        try {
            let products;
            if (username) {
                const product = await Cart.findOne({ user: username, _id: _id });
                if (product) {
                    const orderId = product.orderId;
                    products = await Cart.find({ orderId: orderId });
                    res.json(products);
                } else {
                    const order = await Order.findOne({ clientName: username }).sort({ createdAt: -1 });
                    if (order) {
                        const orderId = order.orderId;
                        products = await Cart.find({ user: username, orderId: orderId });
                        res.json(products)
                    } else {
                        res.json({ message: 'Cannot find product' })
                    }
                }
            } else {
                res.json({ message: 'Cannot find username' })
            }
        } catch (err) {
            console.error(err);
            res.status(400).send({ error: 'ERROR!' });
        }
    }

    async getProductsInTrackingForStaff(req, res) {
        const _id = req.query._id;
        try {
            let products;
            const product = await Cart.findOne({ _id: _id });
            if (product) {
                const orderId = product.orderId;
                products = await Cart.find({ orderId: orderId });
                res.json(products);
            } else {
                res.json({ message: 'Cannot find product' })
            }
        } catch (err) {
            console.error(err);
            res.status(400).send({ error: 'ERROR!' });
        }
    }

    async getProductsInComplete(req, res) {
        const username = req.query.username;
        try {
            let products = [];
            if (username) {
                products = await Cart.find({ user: username, isCompleted: true }).sort({ createdAt: -1 });
            }
            res.json(products);
        } catch (err) {
            console.error(err);
            if (!res.headersSent) {
                res.status(500).send({ error: 'ERROR!' });
            }
        }
    }

    async getProductsInCompleteForStaff(req, res) {
        try {
            let products;
            products = await Cart.find({ isCompleted: true }).sort({ createdAt: -1 });
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(400).send({ error: 'ERROR!' });
        }
    }

    async getPaymentMethosForBill(req, res) {
        const username = req.query.username;
        const _id = req.query._id;
        try {
            const product = await Cart.findOne({ user: username, _id: _id });
            if (product) {
                const orderId = product.orderId;
                const order = await Order.findOne({ clientName: username, orderId: orderId });
                if (order) {
                    res.status(200).json(order.paymentMethod);
                } else {
                    res.status(404).json({ error: 'Order not found' });
                }
            } else {
                const order = await Order.findOne({ clientName: username }).sort({ createdAt: -1 });
                if (order) {
                    res.status(200).json(order.paymentMethod);
                } else {
                    res.status(404).json({ error: 'Order not found' });
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal Server Error!' });
        }
    }

    async getToalPrice(req, res) {
        const username = req.query.username;
        try {
            let products;
            if (username) {
                products = await Cart.find({ user: username, isOrdered: false });
            }
            let totalPrice = 0;
            products.forEach(cart => {
                totalPrice += parseFloat(cart.price) * parseFloat(cart.quantity);
            });
            res.json({ totalPrice });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getProductsForBill(req, res) {
        const _id = req.query._id;
        try {
            let products;
            const product = await Cart.findOne({ _id: _id });
            const orderId = product.orderId;
            products = await Cart.find({ orderId });
            res.status(200).json(products);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error.' });
        }
    }

    async getPriceForBill(req, res) {
        const _id = req.query._id;
        try {
            let products;
            const product = await Cart.findOne({ _id: _id });
            const orderId = product.orderId;
            products = await Cart.find({ orderId: orderId });
            let totalPrice = 0;
            products.forEach(cart => {
                totalPrice += parseFloat(cart.price) * parseFloat(cart.quantity);
            });
            res.json({ totalPrice });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error.' });
        }
    }

    async addToCart(req, res) {
        const { user, image, title, price, quantity, total } = req.body;
        const options = req.query.selectedOptions;
        try {
            const cart = new Cart({
                user: user,
                image: image,
                title: title,
                price: price,
                quantity: quantity,
                total: total,
                options: options
            });
            const newCart = await cart.save();
            res.status(201).json(newCart);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Đã xảy ra lỗi nội bộ' });
        }
    }

    async updateCartItem(req, res) {
        const username = req.params.username;
        const cartId = req.params.cartId;
        const updatedCartItem = req.body;

        try {
            const existingCartItem = await Cart.findOne(
                { _id: cartId, user: username }
            );
            if (existingCartItem) {
                existingCartItem.quantity = updatedCartItem.quantity;
                existingCartItem.total = (parseFloat(updatedCartItem.total) * parseFloat(updatedCartItem.quantity)).toString();
                await existingCartItem.save();
                res.status(200).json(existingCartItem);
            } else {
                res.status(404).json({ message: 'Cart item not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async deleteProduct(req, res) {
        const user = req.query.user;
        const _id = req.query._id;
        try {
            const deletedProduct = await Cart.findOneAndDelete({ user: user, _id: _id });

            if (deletedProduct) {
                res.status(200).json({ message: 'Product deleted successfully' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteAllProductInCart(req, res) {
        const _id = req.query._id;
        try {
            const product = await Cart.findOne({ _id: _id });
            const orderId = product.orderId;
            const deletedProducts = await Cart.deleteMany({ orderId: orderId });
            if (deletedProducts.deletedCount > 0) {
                res.status(200).json({ message: 'All products in cart deleted successfully' });
            } else {
                res.status(404).json({ message: 'No products found in cart' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new CartController();
