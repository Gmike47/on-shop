const express = require('express');
const router = express.Router();
const CartService = require('../services/cartService');

const CartServiceInstance = new CartService();

module.exports = (app, passport) => {

    app.use('/carts', router);

    router.get('/mine', async (req, res, next) => {
        try {
            const { id } = req.user;

            const response = await CartServiceInstance.loadCart(id);
            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    });

    router.put('/mine', async (req, res, next) => {
        try {
            const { id } = req.user;

            const response = await CartServiceInstance.get({ id });
            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    });

    router.post('/mine', async (req, res, next) => {
        try {
            const { id } = req.user;

            const response = await CartServiceInstance.create({ user_id: id });
            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    });

    router.post('/mine/items', async (req, res, next) => {
        try {
            const { id } = req.user;
            const data = req.body;

            const response = await CartServiceInstance.addItem(id, data);
            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    });

    router.put('/mine/items/:cart_items_id', async (req, res, next) => {
        try {
            const { cart_items_id } = req.params;
            const data = req.body;

            const response = await CartServiceInstance.updateItem(cart_items_id, data);
            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    });

    router.delete('/mine/items/:cart_items_id', async (req, res, next) => {
        try {
            const { cart_items_id } = req.params;

            const response = await CartServiceInstance.removeItem(cart_items_id);
            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    });

    router.post('/checkout', async (req, res, next) => {
        try {
            const { id } = req.user;

            const { cart_id, payment_info } = req.body;

            const response = await CartServiceInstance.checkout(cart_id, id, payment_info);
            res.status(200).send(response);

        } catch (err) {
            throw err;
        }
    });
}