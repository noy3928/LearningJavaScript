const express = require('express')

//exporess app
const app = express()

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p>home page</p>'); // express를 이용하면, header 설정을 자동으로 해주기 때문에 따로 헤더를 설정해주지 않아도 된다. 
    res.sendFile('./views/index.html', {root: __dirname}); // 파일을 보내주는 방법
})

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>'); // express를 이용하면, header 설정을 자동으로 해주기 때문에 따로 헤더를 설정해주지 않아도 된다. 
    res.sendFile('./views/about.html', {root: __dirname}); // 파일을 보내주는 방법
})

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

//404 page
app.use((req, res) => {
    //use에서는 매치되지 않는 url에 대해서 반응한다. 
    res.sendFile('./views/404.html', {root: __dirname})
})


