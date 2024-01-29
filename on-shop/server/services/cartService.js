const createError = require('http-errors');
const CartModel = require('../models/cart');
const OrderModel = require('../models/order');
const CartItemModel = require('../models/cartItem');

module.exports = class CartService {

    async create(data) {
        const { user_id } = data;

        try {
            const Cart = new CartModel();
            const cart = await Cart.create(user_id);

            return cart;

        } catch(err) {
            throw err;
        }
    };

    async loadCart(user_id) {
        try {
            
            const cart = await CartModel.findOneByUser(user_id);
            const items = await CartItemModel.find(cart.cart_items_id);
            cart.items = items;

            return cart;

        } catch(err) {
            throw err;
        }
    }

    async addItem(user_id, item) {
        try {
            
            const cart = await CartModel.findOneByUser(user_id);
            const cartItem = await CartItemModel.create({ cart_id: cart.cart_items_id, ...item });

            return cartItem;

        } catch(err) {
            throw err;
        }
    }

    async removeItem(cart_items_id) {
        try {

            const cartItem = await CartItemModel.delete(cart_items_id);

            return cartItem;

        } catch(err) {
            throw err;
        }
    }

    async updateItem(cart_items_id, data) {
        try {

            const cartItem = await CartItemModel.update(cart_items_id, data);

            return cartItem;

        } catch(err) {
            throw err;
        }
    }

    async checkout(cart_id, user_id, payment_info) {
        try {
            
            const stripe = require('stripe')('sk_test_FOY6txFJqPQvJJQxJ8jpeLYQ');

            const cartItems = await CartItemModel.find(cart_id);

            const total = cartItems.reduce((total, item) => {
                return total + Number(item.price);
            }, 0);

            const Order = new OrderModel({ total, user_id });
            Order.addItems(cartItems);
            await Order.create();

            const charge = await stripe.charges.create({
                amount: total,
                currency: 'usd',
                source: payment_info.id,
                description: 'Codecademy Charge'
            });

            const order = Order.update({ status: 'COMPLETE' });

            return order;

        } catch(err) {
            throw err;
        }
    }
}