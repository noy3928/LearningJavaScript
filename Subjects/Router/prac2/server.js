const express = require("express")
const app = express()
app.use("/static", express.static("public"))

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

// static 파일을 사용하기 위해서 필요한 기능

app.listen(process.env.PORT || 3000, () =>
  console.log("server is now running.")
)
