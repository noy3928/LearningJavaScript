const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

//exporess app
const app = express()

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja:qwe123@cluster0.ur9gc.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect();

//register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// listen for requests
app.listen(3000);

//middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))

// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// })
 
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', {title: 'Home', blogs})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog'})
})

//404 page
app.use((req, res) => {
    //use에서는 매치되지 않는 url에 대해서 반응한다. 
    res.status(404).render('404', {title : '404'})
})


