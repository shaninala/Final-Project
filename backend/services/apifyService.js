const { ApifyClient } = require("apify-client")
const config = require("../config/config")
const cacheService = require("./cacheService")

const client = new ApifyClient({
  token: config.APIFY_API_TOKEN,
})

async function getGasPrices(zipcodes) {
  try {
    const cacheKey = zipcodes.sort().join("-")
    const cachedData = await cacheService.get(cacheKey)
    if (cachedData) {
      console.log(`Returning cached gas prices for zipcodes: ${zipcodes.join(", ")}`)
      return {
        message: "Cached data retrieved successfully.",
        cached: true,
        data: cachedData.data,
        cachedAt: cachedData.timestamp,
      }
    }
    console.log(`Fetching fresh gas prices for zipcodes: ${zipcodes.join(", ")}`)
    const run = await client.actor("scraped/gas-station-prices").call({ zipcodes })
    const datasetUrl = `https://console.apify.com/storage/datasets/${run.defaultDatasetId}`
    console.log(`API run completed. Dataset URL: ${datasetUrl}`)
    const { items } = await client.dataset(run.defaultDatasetId).listItems()
    const response = {
      message: "API run completed.",
      datasetUrl,
      data: items,
    }
    await cacheService.set(cacheKey, {
      data: items,
      timestamp: new Date().toISOString(),
    })
    return response
  } catch (error) {
    console.error("Error running Apify API:", error)
    throw {
      error: "Failed to run Apify API.",
      message: error.message,
      stack: config.NODE_ENV === "development" ? error.stack : undefined,
    }
  }
}
module.exports = {
  getGasPrices,
}
