const mongoose = require("mongoose")

module.exports = {
  connect: DB_HOST => {
    //몽고드라이버의 업데이트된 URL 스트링 파서 사용
    // mongoose.set("useNewUrlParser", true)
    // mongoose.set("useFindAndModify", false)
    // mongoose.set("useCreateIndex", true)
    // mongoose.set("useUnifiedTopology", true)
    mongoose.connect(DB_HOST)
    mongoose.connection.on("error", err => {
      console.error(err)
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running"
      )
      process.exit()
    })
  },
  close: () => {
    mongoose.connection.close()
  },
}
