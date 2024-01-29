const express = require('express');
const router = express.Router();

const ProductService = require('../services/productService');
const ProductServiceInstance = new ProductService();

module.exports = (app) => {

    app.use('/products', router);

    router.get('/', async (req, res, next) => {
        try {
            const queryParams = req.query;

            const response = await ProductServiceInstance.list(queryParams);
            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    });

    router.get('/:product_id', async (req, res, next) => {
        try {
            const { product_id } = req.params;

            const response = await ProductServiceInstance.get(product_id);
            res.status(200).send(response);

        } catch(err) {
            next(err);
        }
    });
}