const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {type: String, require: true, unique: true},
    author: [Schema.Types.ObjectId],
    content: String,
    create_at: {type: Date, default: Date.now()}
})


module.exports = BlogSchema;