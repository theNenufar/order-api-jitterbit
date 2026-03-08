const express = require("express");
const router = express.Router();
const orderController = require("../controller/order-controller");

router.post("/", orderController.createOrder);
router.get("/list", orderController.getOrders);
router.get("/:orderId", orderController.getOrder);
router.put("/:orderId", orderController.updateOrder);
router.delete("/:orderId", orderController.deleteOrder)

module.exports = router;
