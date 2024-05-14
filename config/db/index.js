const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/cafe_shop');
        console.log('Connect succesfully!!!')
    } catch (error) {
        console.log('Connect failed!!!')
    }
}
module.exports = { connect }