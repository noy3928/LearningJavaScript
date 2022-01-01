//유저 모델, 유저 스키마. 모델이 무엇인가? 모델은 스키마를 감싸주는 역항을 하는 것이다. 스키마는 무엇인가? 상품에 관련된 글을 작성한다면, 그 글을 작성한 사람이 누구인지, 작성할 때, 그 포스트의 이름이 무엇인지, 그 타입은 무엇인지, 이렇게 하나하나 지정해주는 것이 스키마를 통해서 할 수 있는 것이고, 모델은 그 스키마를 감싸주는 것이다. 스키마는 그 모델을 하나하나를 지정해주는 것이다. 

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

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

//mongoose에서 가져온 메서드이다. save라는 인자를 넣어주면, 이 모델에 정보를 저장하기 전에, 무엇을 하겠다 라는 것이다. 만약 이게 다 끝나면, save라는 메서드가 실행된다는 것이다. 
userSchema.pre('save', function(next){
    var user = this; // 아 this는 현재 userSchema를 가리킨다. 
    if(user.isModified('password')){
        //비밀번호를 암호화 시킨다. 
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
    
            //myPlaintextPassword(첫번째 인자)는 아직 암호화되지 않은 비밀번호. 
            //두번째 인자는 함수의 인자를 그대로 넣어주기 
            bcrypt.hash(user.password , salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash //hash 된 비밀번호를 스키마에 넣어준다. 
                // Store hash in your password DB.
                next()
            });
        });
    } else {
        // else 문을 넣어주지 않으면, 이 안에서 머물게 될 것이다. 
        next()
    }
}) 

userSchema.methods.comparePassword = function(plainPassword, cb){

    //plainPassword가 123456 라고 가정하고 // 첫번째 인자와 두번째 인자를 비교하는 메서드 compare
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
        
        cb(null, isMatch)//에러는 없고, isMatch가 true이다. 라고 말하는 것. 
    })

}

userSchema.methods.generateToken = function(cb){

    var user = this;

    //jsonwebtoken 을 이용해서 토큰을 생성하기 

    var token = jwt.sign(user._id, 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user);
    })

}

//위에서 작성된 스키마를 모델로 감싸준다. 
const User = mongoose.model('User', userSchema); // 첫번째 인자는 스키마의 이름, 두번째에는 스키마를 담아주기.

module.exports = {User}

//서버에서 받을 때 필요한 것이 있다. body-parser가 그것이다.  