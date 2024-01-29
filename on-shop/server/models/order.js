const db = require('../db-index');
const moment = require('moment');
const pgp = require('pg-promise');
const OrderItem = require('./orderItem');

module.exports = class OrderModel {

    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.items = data.items || [];
        this.last_modified = moment.utc().toISOString();
        this.status = data.status || 'Pending';
        this.total = data.total || 0;
        this.user_id = data.user_id || null;
    }

    addItems(items) {
        this.items = items.map(item = new OrderItem(item));
    }

    async create() {
        try {
            const { items, ...order  } = this;

            const statement = pgp.helpers.insert(order, null, 'orders') + 'RETURNING *';

            const result = await db.query(statement);

            if (result.rows?.length) {
                Object.assign(this, result.rows[0]);
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    async update(data) {

        try {
            const condition = pgp.as.format('WHERE order_id = ${id} RETURNING *', {id : this.order_id});
            const statement = pgp.helpers.update(data, null, 'orders') + condition;

            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    static async findByUser(user_id) {
        try {
            const statement = `SELECT * FROM orders WHERE "user_id" = $1`;
            const values = [user_id];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;
            
        } catch(err) {
            throw new Error(err);
        }
    }

    static async findById(order_id) {
        try {
            const statement = `SELECT * FROM orders WHERE "order_id" = $1`;
            const values = [order_id];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;
            
        } catch(err) {
            throw new Error(err);
        }
    }
}