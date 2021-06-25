const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const morgan = require('morgan')
const authRoutes = require('./routes/auth')
const aboutmeRoutes = require('./routes/aboutme');
const portfolioRoutes = require('./routes/portfolio');
const blogRoutes = require('./routes/blog');
const contactsRoutes = require('./routes/contacts');
const mongoose = require('mongoose')
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI, { useNewUrlParser: false })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(passport.initialize());
require('./middleware/passport')(passport)


app.use(morgan('dev'))
app.use('/gallery/portfolio/', express.static('gallery/portfolio'))
app.use('/gallery/blog/', express.static('gallery/blog'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors({
    optionsSuccessStatus: '200'
}));

app.use('/api/auth', authRoutes)
app.use('/api/about', aboutmeRoutes)
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contacts', contactsRoutes);

module.exports = app