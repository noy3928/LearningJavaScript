// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios")
const cheerio = require("cheerio")
const pretty = require("pretty")
const fs = require("fs")

const url =
  "https://www.youtube.com/watch?v=h_XDmyz--0w&list=PLuHgQVnccGMCgrP_9HL3dAcvdt8qOZxjW"

async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url)
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data)
    const list = $("#items", "#container")
    console.log(list.html())
    const items = []

    // Select all the list items in plainlist class

    fs.writeFile("coutries.json", JSON.stringify(items, null, 2), err => {
      if (err) {
        console.error(err)
        return
      }
      console.log("Successfully written data to file")
    })
  } catch (err) {
    console.error(err)
  }
}
// Invoke the above function
scrapeData()
