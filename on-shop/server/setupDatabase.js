const { Client } = require('pg');
const { DB } = require('./config');

(async () => {
    const usersTableStmt = `
        CREATE TABLE IF NOT EXISTS users (
            user_id         INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
            email           varchar(50),
            password        varchar(30),
            username        varchar(50),
            created         date,
            last_modified   date
        )
    `

    const productsTableStmt = `
        CREATE TABLE IF NOT EXISTS products (
            product_id      INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
            name            VARCHAR(50)     NOT NULL,
            price           BIGINT          NOT NULL,
            description     VARCHAR(50)     NOT NULL
        )
    `

    const ordersTableStmt = `
        CREATE TABLE IF NOT EXISTS orders (
            order_id        INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
            total           INT             NOT NULL,
            status          VARCHAR(50)     NOT NULL,
            user_id         INT             NOT NULL,
            created         DATE            NOT NULL,
            last_modified   DATE            NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(used_id)
        )
    `

    const orderItemsTableStmt = `
        CREATE TABLE IF NOT EXISTS order_items (
            order_item_id   INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
            created         DATE            NOT NULL,
            qty             INT             NOT NULL,
            price           INT             NOT NULL,
            name            varchar(50)     NOT NULL,
            description     varchar(200)    NOT NULL,
            order_id        INT             NOT NULL,
            product_id      INT             NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(order_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        )
    `

    const cartsTableStmt = `
        CREATE TABLE IF NOT EXISTS carts (
            cart_id         INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
            created         DATE            NOT NULL,
            modified        DATE            NOT NULL,
            user_id         INT             NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(used_id)
        )
    `

    const cartItemsTableStmt = `
        CREATE TABLE IF NOT EXISTS cart_items (
            cart_item_id    INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
            qty             INT             NOT NULL,
            cart_id         INT             NOT NULL,
            product_id      INT             NOT NULL,
            FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        )
    `

    try {
        const db = new Client({
            user: DB.PGUSER,
            host: DB.PGHOST,
            database: DB.PGDATABASE,
            password: DB.PGPASSWORD,
            port: DB.PGPORT
        });

        await db.connect();

        await db.query(usersTableStmt);
        await db.query(productsTableStmt);
        await db.query(ordersTableStmt);
        await db.query(orderItemsTableStmt);
        await db.query(cartsTableStmt);
        await db.query(cartItemsTableStmt);

        await db.end();

    } catch(err) {
        console.log("ERROR creating one or more tables: ", err)
    }
}) ();