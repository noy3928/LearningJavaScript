$(document).ready(function () {})

for (var i = 0; i < 200; i++) {
  var output = ""

  output += `rotateY${i * 20}deg`
  output += `translateY${i * 5}px`
  output += `translateX${310}px`

  $("<div></div>")
    .addClass("image")
    .css({
      width: 100,
      height: 60,
      transform: output,
    })
    .addpendTo("#image_gallery")
}
