const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(morgan("div"))
app.use(express.static("public"))

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.listen(3000, () => console.log("App is listening on port 3000"))
