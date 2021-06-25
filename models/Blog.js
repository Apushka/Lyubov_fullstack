const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    category: String,
    title: String,
    headerMedia: String,
    date: String,
    body: String,
    photo: Array,
    video: Array
}, { collection: 'Blog' });

module.exports = mongoose.model('Blog', BlogSchema);