const express = require("express")
const bodyParser = require("body-parser")
const api_endpoints = require("../api/index")
const app = express()
const cors = require("cors")
const path = require("path")

app.use(cors())
app.use(bodyParser.json())

app.use("/", api_endpoints)

app.use(express.static(path.join(__dirname, "./react-app/build")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./react-app/build", "index.html"))
})

module.exports = app
