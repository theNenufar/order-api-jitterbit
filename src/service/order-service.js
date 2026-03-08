const orderRepository = require("../repository/order-repository");

exports.createOrder = async (orderRequest) => {
    const orderId = orderRequest.numeroPedido.split("-")[0];
    const value = orderRequest.valorTotal;
    const creationDate = new Date(orderRequest.dataCriacao).toISOString();

    const items = orderRequest.items.map(item => ({
        productId: Number(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem
    }));

    const order = {
        orderId,
        value,
        creationDate,
        items
    };

    return await orderRepository.createOrder(order);
}

exports.getOrder = async (orderId) => {
    return await orderRepository.getOrder(orderId);
}
