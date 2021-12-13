const express = require('express')

//exporess app
const app = express()

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {

res.send('<p>home page</p>'); // express를 이용하면, header 설정을 자동으로 해주기 때문에 따로 헤더를 설정해주지 않아도 된다. 

})