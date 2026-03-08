const orderService = require("../service/order-service");

exports.createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await orderService.getOrder(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.status(200).json(orders);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await orderService.updateOrder(req.params.orderId, req.body);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error" });
    }
};
