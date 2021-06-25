const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutMeSchema = new Schema({
    aboutMe: String
}, {collection: 'AboutMe'})

module.exports = mongoose.model('AboutMe', AboutMeSchema);