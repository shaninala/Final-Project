const fs = require("fs").promises
const path = require("path")
const CACHE_DIR = path.join(__dirname, "../cache")
async function ensureCacheDir() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true })
  } catch (error) {
    if (error.code !== "EEXIST") {
      console.error("Error creating cache directory:", error)
      throw error
    }
  }
}

async function get(key) {
  try {
    await ensureCacheDir()

    const filePath = path.join(CACHE_DIR, `${key}.json`)
    try {
      await fs.access(filePath)
    } catch (error) {
      return null
    }

    const data = JSON.parse(await fs.readFile(filePath, "utf8"))
    const cachedDate = new Date(data.timestamp)
    const currentDate = new Date()
    const isSameDay =
      cachedDate.getDate() === currentDate.getDate() &&
      cachedDate.getMonth() === currentDate.getMonth() &&
      cachedDate.getFullYear() === currentDate.getFullYear()
    if (!isSameDay) {
      console.log(`Cache expired for key: ${key} (from ${cachedDate.toDateString()})`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error reading cache for key: ${key}`, error)
    return null
  }
}

async function set(key, data) {
  try {
    await ensureCacheDir()

    const filePath = path.join(CACHE_DIR, `${key}.json`)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    console.log(`Cache saved for key: ${key}`)
  } catch (error) {
    console.error(`Error writing cache for key: ${key}`, error)
  }
}

async function clear(key) {
  try {
    await ensureCacheDir()

    if (key) {
      const filePath = path.join(CACHE_DIR, `${key}.json`)
      await fs.unlink(filePath)
      console.log(`Cache cleared for key: ${key}`)
    } else {
      const files = await fs.readdir(CACHE_DIR)
      for (const file of files) {
        if (file.endsWith(".json")) {
          await fs.unlink(path.join(CACHE_DIR, file))
        }
      }
      console.log("All cache cleared")
    }
  } catch (error) {
    console.error("Error clearing cache:", error)
  }
}

module.exports = {
  get,
  set,
  clear,
}
