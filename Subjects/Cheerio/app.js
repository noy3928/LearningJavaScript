const axios = require("axios")
const cheerio = require("cheerio")
const pretty = require("pretty")

const markup = `
<ul class="fruits">
  <li class="fruits__mango"> Mango </li>
  <li class="fruits__apple"> Apple </li>
</ul>
`

const $ = cheerio.load(markup)

console.log(pretty($.html()))

const mango = $(".fruits__mango")
console.log(mango.html()) // Mango

const apple = $(".fruits__apple")
console.log(apple.attr("class")) //fruits__apple

const listItems = $("li")
console.log(listItems.length) // 2
listItems.each(function (idx, el) {
  console.log($(el).text())
})
// Mango
// Apple

/*
The append method will add the element passed as an argument after the last child of the selected element. 
On the other hand, prepend will add the passed element before the first child of the selected element.
*/
const ul = $("ul")
ul.append("<li>Banana</li>")
ul.prepend("<li>Pineapple</li>")
console.log(pretty($.html()))
