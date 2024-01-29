const db = require('../db-index');
const moment = require('moment');
const pgp = require('pg-promise');

module.exports = class OrderItemModel {

    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.description = data.description;
        this.last_modified = moment.utc().toISOString();
        this.name = data.name;
        this.price = data.price || 0;
        this.product_id = data.product_id;
        this.qty = data.qty || 1;
        this.order_id = data.order_id || null;
    }

    static async create(data) {
        try {
            const statement = pgp.helpers.insert(data, null, 'orderItems') + 'RETURNING *';

            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    static async find(order_id) {
        try {
            const statement = `SELECT oi.qty, oi.order_item_id AS "cart_item_id", p.*
                               FROM "order_items" oi INNER JOIN products p
                               ON p.product_id = oi.product_id WHERE order_id = $1`;
            const values = [order_id];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows;
            }

            return [];
            
        } catch(err) {
            throw new Error(err);
        }
    }
}