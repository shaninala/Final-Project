const express = require("express")
const apifyService = require("../services/apifyService")

const router = express.Router()

router.post("/", async (req, res, next) => {
  const { zipcodes } = req.body

  if (!Array.isArray(zipcodes) || zipcodes.length === 0) {
    return res.status(400).json({ error: "Missing or invalid zipcodes array in request body." })
  }

  try {
    console.log(`Running Apify actor for zipcodes: ${zipcodes.join(", ")}`)

    const result = await apifyService.getGasPrices(zipcodes)

    res.setHeader("Content-Type", "application/json")
    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
