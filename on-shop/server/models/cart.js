const db = require('../db-index');
const moment = require('moment');
const pgp = require('pg-promise');

module.exports = class CartModel {
    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.last_modified = moment.utc().toISOString();
        this.converted = data.converted || null;
        this.is_active = data.is_active || true;
    }

    async create(user_id) {

        try {
            const data = { user_id, ...this };

            const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';

            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    static async findOneByUser(user_id) {
        try {
            const statement = `SELECT * FROM carts WHERE user_id = $1`;
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

    static async findOneById(id) {
        try {
            const statement = `SELECT * FROM carts WHERE user_id = $1`;
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