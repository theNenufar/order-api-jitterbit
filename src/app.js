const express = require("express")
const orderRoutes = require("./route/order-route")
const app = express()

app.use(express.json())

app.use("/order", orderRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API running" })
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
