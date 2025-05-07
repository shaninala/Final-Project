function errorHandler(err, req, res, next) {
    console.error("Express error:", err)
    res.status(500).json({
      error: "Server error",
      message: err.message,
    })
  }
  
  module.exports = errorHandler
  