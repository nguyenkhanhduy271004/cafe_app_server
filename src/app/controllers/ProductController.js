const Product = require('../Models/Product')

class ProductController {

    async getProducts(req, res) {
        Product.find({})
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({ error: 'ERROR!' });
            });
    }

    async getListBestCafe(req, res) {
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

    async getListBestCake(req, res) {
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

    async getProductsEvaluate(req, res) {
        try {
            const query = req.query.evaluateValue;
            let products;
            if (query == "asc") {
                products = await Product.find({}).sort({ star: 1 });
            } else {
                products = await Product.find({}).sort({ star: -1 });
            }
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getProductsPrice(req, res) {
        try {
            const query = req.query.priceValue;
            let products;
            if (query == "asc") {
                products = await Product.find({}).sort({ price: 1 });
            } else {
                products = await Product.find({}).sort({ price: -1 });
            }
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getProductsSearch(req, res) {
        try {
            const query = req.query.searchValue ? req.query.searchValue.toLowerCase() : null;
            let products;
            if (query) {
                products = await Product.find({ title: { $regex: new RegExp(query, 'i') } });
            }
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getProductsCategory(req, res) {
        const category = req.query.category;
        try {
            let products;
            if (category) {
                products = await Product.find({ category });
            } else {
                products = await Product.find({});
            }
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new ProductController();
