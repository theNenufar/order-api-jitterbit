const pool = require("../config/database");

exports.createOrder = async (order) => {
    const orderQuery = `
        INSERT INTO orders (orderId, value, creationDate)
        VALUES ($1, $2, $3)
    `;

    await pool.query(orderQuery, [
        order.orderId,
        order.value,
        order.creationDate
    ]);

    const itemQuery = `
        INSERT INTO items (orderId, productId, quantity, price)
        VALUES ($1, $2, $3, $4)
    `;

    for (const item of order.items) {
        await pool.query(itemQuery, [
            order.orderId,
            item.productId,
            item.quantity,
            item.price
        ]);
    }
    return order;
};

exports.getOrder = async (orderId) => {
    const orderQuery = `
        SELECT * FROM orders WHERE orderId = $1
    `;

    const orderResult = await pool.query(orderQuery, [orderId]);

    if (orderResult.rows.length === 0) {
        return null;
    }

    const order = orderResult.rows[0];

    const itemsQuery = `
        SELECT * FROM items WHERE orderId = $1
    `;

    const items = await pool.query(itemsQuery, [orderId]);

    order.items = items.rows;

    return order;
};

exports.getOrders = async () => {
    const orderQuery = `
        SELECT * FROM orders
    `;

    const orderResult = await pool.query(orderQuery);
    const orders = orderResult.rows;

    for (const order of orders) {
        const itemsQuery = `
            SELECT * FROM items WHERE orderId = $1
        `;

        const items = await pool.query(itemsQuery, [order.orderId]);

        order.items = items.rows;
    }

    return orders;
};

exports.updateOrder = async (order) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const updateQuery = `
            UPDATE orders SET value = $1 WHERE orderId = $2
        `;
        await client.query(updateQuery, [order.value, order.orderId]);

        const deleteQuery = `
            DELETE FROM items WHERE orderId = $1
        `;
        await client.query(deleteQuery, [order.orderId]);

        const itemQuery = `
            INSERT INTO items (orderId, productId, quantity, price)
            VALUES ($1, $2, $3, $4)
        `;
        for (const item of order.items) {
            await client.query(itemQuery, [order.orderId, item.productId, item.quantity, item.price]);
        }

        await client.query('COMMIT');
        return order;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
};
