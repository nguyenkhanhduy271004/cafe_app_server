const Discount = require('../Models/Discount');

class DiscountController {

    getAllDiscounts(req, res) {
        Discount.find({})
            .then(discounts => {
                res.json(discounts);
            })
            .catch(err => {
                console.error(err);
                res.status(400).send({ error: 'ERROR!' });
            });
    }
}

module.exports = new DiscountController();
