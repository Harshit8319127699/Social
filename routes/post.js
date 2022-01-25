const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    created:{
        type:Date,
        default:Date.now()
    }
});
module.exports = mongoose.model('posts', postSchema);