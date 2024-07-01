const express = require("express")
const cors = require("cors")
const app = express()
const offerRoutes = require("./routes/offerRoutes")
const bodyParser = require("body-parser")

app.use(cors())
app.use(bodyParser.json())
app.get("/", (req, res) => {
  res.send("Hello World!")
})
app.use("/offers", offerRoutes)

module.exports = app
