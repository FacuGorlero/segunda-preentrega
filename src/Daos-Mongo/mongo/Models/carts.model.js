const {Schema, model} = require ("mongoose")

const cartShema = new Schema({
    cart: { type: Array, default: []},
    atCreated: { type: Date, default:Date()},
})

exports.cartModel = model('carts', cartShema)