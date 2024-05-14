const Address = require('../Models/Address')

class AddressController {

    async getAddress(req, res) {
        const username = req.query.username;
        try {
            let address;
            await Address.updateMany({}, { isSelected: false });
            if (username) {
                address = await Address.find({ username: username });
            }
            res.json(address);
        } catch (err) {
            console.error(err);
            res.status(400).send({ error: 'ERROR!' });
        }
    }

    async getAddressForUser(req, res) {
        const username = req.query.username;
        try {
            let address;
            if (username) {
                address = await Address.findOne({ username: username, isSelected: true });
            }
            res.json(address);
        } catch (err) {
            console.error(err);
            res.status(400).send({ error: 'ERROR!' });
        }
    }

    async saveDataAddress(req, res) {
        const address = new Address({
            username: req.body.username,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            isSelected: req.body.isSelected
        });
        try {
            await address.save();
            res.status(201).json({ message: 'Lưu model address thành công' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Đã xảy ra lỗi nội bộ' });
        }
    }

    async updateDataAddress(req, res) {
        const { username, name, phone, address } = req.body;
        try {
            await Address.updateMany({}, { isSelected: false });

            let updatedAddress = await Address.findOneAndUpdate(
                {
                    username: username,
                    name: name,
                    phone: phone,
                    address: address
                },
                { isSelected: true }
            );

            if (updatedAddress) {
                res.status(200).json({ message: 'Success update address' });
            } else {
                res.status(404).json({ message: 'Address not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new AddressController();
