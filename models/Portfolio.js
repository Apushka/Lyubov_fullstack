const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    imageSrc: [{
        type: String,
        default: ''
    }]
},
    { collection: 'Portfolio' })

module.exports = mongoose.model('Portfolio', portfolioSchema);

