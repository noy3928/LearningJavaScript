const express = require('express');
const app = express();
const port = 3000; //포트는 아무거나 해도 상관없다. 

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://noy3928:sdc03928@boilerplate.6rnsp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => console.log('MongoDB Connected')).catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

