const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const { render } = require('ejs')

//exporess app
const app = express()

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja:qwe123@cluster0.ur9gc.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// listen for requests


//middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

// //mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title : 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     //save는 promise를 반환한다. 
//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.get('/single-blog',(req, res) => {
//     Blog.findById('61bd6575f44b6a23fa13e731')
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// })
 
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

//404 page
app.use((req, res) => {
    //use에서는 매치되지 않는 url에 대해서 반응한다. 
    res.status(404).render('404', {title : '404'})
})


