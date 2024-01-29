const db = require('../db-index');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartItemModel {

    static async create(data) {
        try {
            const statement = pgp.helpers.insert(data, null, 'cart_items') + 'RETURNING *';

            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }
            
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    static async update(id, data) {
        try {
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
            const statement = pgp.helpers.update(data, null, 'cart_items') + condition;

            const result = await db.query(statement);
            
            if (result.rows?.length) {
                return result.rows[0];
            }
            
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    static async find(cart_id) {
        try {
            const statement = `SELECT ci.qty, ci.cart_item_id AS "cartItemId", p.*
                               FROM "cart_items" ci INNER JOIN products p
                               ON p.product_id = ci.product_id WHERE cart_id = $1`;
            const values = [cart_id];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows;
            }

            return [];
            
        } catch(err) {
            throw new Error(err);
        }
    }

    static async delete(id) {
        try {
            const statement = `DELETE FROM cart_items WHERE cart_items_id = $1 RETURNING *`;
            const values = [id];

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