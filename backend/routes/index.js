const express = require("express")
const gasPriceRoutes = require("./gasPrice")

const router = express.Router()

router.use("/gas-api", gasPriceRoutes)

module.exports = router
