const express = require('express');
const app = express();
const port = 3000; //포트는 아무거나 해도 상관없다. 
const bodyParser = require('body-parser');

const { User } = require('./models/User')

//application/x-www-form-urlencoed <- 이렇게 된 부분을 해석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

//json 화 된 파일을 해석해서 가져온다. 
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://noy3928:sdc03928@boilerplate.6rnsp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => console.log('MongoDB Connected')).catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/register', (req, res) => {

    //회원 가입 할 때 필요한 정보들을 client에서 가져오면 
    //그것들을 데이터 베이스에 넣어준다. 

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })

})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

