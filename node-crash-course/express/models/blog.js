const mongoose = require('mongoose');
const Schema = mongoose.Schema; //define a structure. the things that model

const blogSchema = new Schema({
    title : {
        type : String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema) // 첫번째 인자는 주목할 대상, 두번째는 스키마 넣어주기. 
module.exports = Blog;

