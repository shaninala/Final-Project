require("dotenv").config()

const env = process.env.NODE_ENV || "development"
const config = {
  PORT: process.env.PORT || 5000,
  APIFY_API_TOKEN: process.env.APIFY_API_TOKEN,
  NODE_ENV: env,
  CORS_ORIGINS: ["http://localhost:3000", "http://127.0.0.1:3000"],
  CACHE: {
    ENABLED: process.env.CACHE_ENABLED !== "false", 
    DIR: process.env.CACHE_DIR || "./cache",
  },
}
const envConfigs = {
  development: {
  },
  production: {
    CORS_ORIGINS: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : config.CORS_ORIGINS,
  },
  test: {
    PORT: 5001,
  },
}

module.exports = { ...config, ...(envConfigs[env] || {}) }