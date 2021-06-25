const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        if ((req.originalUrl).includes('portfolio')) {
            cb(null, 'gallery/portfolio/');
        } else if ((req.originalUrl).includes('blog')) {
            cb(null, 'gallery/blog/');
        }
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYY-HHmmss_SSS');
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/png' || 
        file.mimetype === 'video/mp4') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    // fileSize: 1024 * 1024 * 20
}

module.exports = multer({ storage, fileFilter, limits });