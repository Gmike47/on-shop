const createError = require('http-errors');
const OrderModel = require('../models/order');
const OrderItemModel = require('../models/orderItem');

module.exports = class OrderService {

    async create(data) {
        const { user_id } = data;

        try {
            const Order = new OrderModel();
            const order = await Order.create({user_id, total});

            return cart;

        } catch (err) {
            throw err;
        }
    }

    async list(user_id) {
        try {
            const orders = await OrderModel.findByUser(user_id);

            return orders;

        } catch(err) {
            throw err;
        }
    }

    async findById(user_id) {
        try {
            const order = await OrderModel.findById(user_id);

            return order;

        } catch(err) {
            throw err;
        }
    }
}