const orderService = require("../service/order-service");

exports.createOrder = async (req, res) => {
    try {
        const orderRequest = await orderService.createOrder(req.body);
        res.status(201).json(orderRequest);
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal server error" });
    }
};
