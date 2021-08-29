const {Schema, model} = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 150
    },
    body: {
        type: String,
        required: true,
    },
    tags:{
        type:[String],
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thumbnail: String,
    readtime: String,
}, {
    timestamps: true
})

module.exports = model('Post', postSchema);