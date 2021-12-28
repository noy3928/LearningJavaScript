//유저 모델, 유저 스키마. 모델이 무엇인가? 모델은 스키마를 감싸주는 역항을 하는 것이다. 스키마는 무엇인가? 상품에 관련된 글을 작성한다면, 그 글을 작성한 사람이 누구인지, 작성할 때, 그 포스트의 이름이 무엇인지, 그 타입은 무엇인지, 이렇게 하나하나 지정해주는 것이 스키마를 통해서 할 수 있는 것이고, 모델은 그 스키마를 감싸주는 것이다. 스키마는 그 모델을 하나하나를 지정해주는 것이다. 

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 50
    },
    role:{
        type: Number,
        default: 0
    },
    image:String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//위에서 작성된 스키마를 모델로 감싸준다. 
const User = mongoose.model('User', userSchema); // 첫번째 인자는 스키마의 이름, 두번째에는 스키마를 담아주기.

module.exports = {User}

//서버에서 받을 때 필요한 것이 있다. body-parser가 그것이다.  