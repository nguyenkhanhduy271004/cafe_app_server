const addresssRouter = require('./addresss')
const cartRouter = require('./cart')
const discountsRouter = require('./discount')
const emailsRouter = require('./emails')
const loginRouter = require('./login')
const ordersRouter = require('./orders')
const productsRouter = require('./products')
const replyRouter = require('./reply')
const usersRouter = require('./users')


function route(app) {

    app.use('/address', addresssRouter)

    app.use('/cart', cartRouter)

    app.use('/discounts', discountsRouter)

    app.use('/emails', emailsRouter)

    app.use('/login', loginRouter)

    app.use('/orders', ordersRouter)

    app.use('/products', productsRouter)

    app.use('/reply', replyRouter)

    app.use('/users', usersRouter)


}

module.exports = route;