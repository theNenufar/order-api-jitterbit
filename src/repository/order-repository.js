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
}
