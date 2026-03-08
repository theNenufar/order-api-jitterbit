const express = require("express");
const router = express.Router();
const orderController = require("../controller/order-controller");

router.post("/", orderController.createOrder);
router.get("/:orderId", orderController.getOrder)

module.exports = router;
