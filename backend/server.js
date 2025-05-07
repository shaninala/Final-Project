require("dotenv").config()
const express = require("express")
const cors = require("cors")
const config = require("./config/config")
const errorHandler = require("./middleware/errorHandler")
const routes = require("./routes")

const app = express()
const PORT = config.PORT

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
)
app.use(express.json())

app.use(routes)

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason)
})
