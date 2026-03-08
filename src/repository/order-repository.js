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
