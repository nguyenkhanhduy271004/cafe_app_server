const Product = require('../Models/Product')

class ProductController {

    getProducts(req, res) {
        Product.find({})
            .then(product => {
                res.json(product);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({ error: 'ERROR!' });
            });
    }

    getListBestCafe(req, res) {
        const popular = "best"
        const category = "cafe";
        Product.find({ popular: popular, category: category })
            .then(products => {
                res.json(products);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({ error: 'ERROR!' });
            });
    }

    getListBestCake(req, res) {
        const popular = "best"
        const category = "cake";
        Product.find({ popular: popular, category: category })
            .then(products => {
                res.json(products);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({ error: 'ERROR!' });
            });
    }

    getProductsEvaluate(req, res) {
        const query = req.query.evaluateValue;
        let productsPromise;
        if (query == "asc") {
            productsPromise = Product.find({}).sort({ star: 1 }).exec();
        } else {
            productsPromise = Product.find({}).sort({ star: -1 }).exec();
        }
        productsPromise
            .then(products => {
                res.json(products);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    getProductsPrice(req, res) {
        const query = req.query.priceValue;
        let productsPromise;
        if (query == "asc") {
            productsPromise = Product.find({}).sort({ price: 1 }).exec();
        } else {
            productsPromise = Product.find({}).sort({ price: -1 }).exec();
        }
        productsPromise
            .then(products => {
                res.json(products);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    getProductsSearch(req, res) {
        const query = req.query.searchValue ? req.query.searchValue.toLowerCase() : null;
        let productsPromise;
        if (query) {
            productsPromise = Product.find({ title: { $regex: new RegExp(query, 'i') } }).exec();
        } else {
            productsPromise = Promise.resolve([]);
        }
        productsPromise
            .then(products => {
                res.json(products);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    getProductsCategory(req, res) {
        const category = req.query.category;
        let productsPromise;
        if (category) {
            productsPromise = Product.find({ category }).exec();
        } else {
            productsPromise = Product.find({}).exec();
        }
        productsPromise
            .then(products => {
                res.json(products);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    getInforProduct(req, res) {
        const title = req.query.title;

        Product.findOne({ title: title })
            .then(product => {
                if (product) {
                    res.json(product);
                } else {
                    res.status(404).json({ error: 'Not found' });
                }
            })
            .catch(error => {
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    updateProductPopularStatus(req, res) {
        const title = req.query.title;
        const popular = req.query.popular;

        Product.findOne({ title: title }).exec()
            .then(product => {
                if (!product) {
                    return res.status(404).json({ error: 'Product not found' });
                }
                product.popular = popular;
                return product.save();
            })
            .then(() => {
                res.json({ message: 'Product popular status updated successfully' });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    addProduct(req, res) {
        const { imageUrl, name, price, best, category } = req.body;

        if (!imageUrl || !name || !price || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProduct = new Product({
            image: imageUrl,
            title: name,
            price,
            popular: best || false,
            category
        });

        newProduct.save()
            .then(product => {
                res.status(201).json(product);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    updateInforProduct(req, res) {
        const title = req.query.title;
        const { imageUrl, name, price, category } = req.body;

        if (!imageUrl || !name || !price || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const update = { image: imageUrl, title: name, price, category };

        Product.findOneAndUpdate({ title: title }, update, { new: true })
            .then(updatedProduct => {
                if (updatedProduct) {
                    res.json({ message: 'Update successfully' });
                } else {
                    res.status(404).json({ error: 'Product not found' });
                }
            })
            .catch(error => {
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    deleteProduct(req, res) {
        const title = req.query.title;

        Product.findOneAndDelete({ title: title })
            .then(result => {
                if (result) {
                    res.status(200).json({ message: 'Product deleted successfully' });
                } else {
                    res.status(404).json({ error: 'Product not found' });
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
}

module.exports = new ProductController();
