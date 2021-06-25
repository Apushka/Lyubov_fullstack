const Portfolio = require('../models/Portfolio');
const fs = require('fs');
const errorHandler = require('../utils/errorHandler');

module.exports.getPortfolio = async (req, res) => {
    let data = await Portfolio.findOne();
    if (data) {
        let images = data.imageSrc.map((item) => { return req.protocol + '://' + req.headers.host + '/' + item });
        res.status(200).json({
            imageSrc: images
        });
    } else {

    }
}

module.exports.addPhoto = async (req, res) => {
    try {
        await Portfolio.findOneAndUpdate(
            {
                $push: {
                    imageSrc: {
                        $each: [req.file.path],
                        // $position: 0
                    }
                }
            }
        );
        res.status(201).json({
            resultCode: 0,
            photo: req.protocol + '://' + req.headers.host + '/' + req.file.path
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updatePhoto = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (portfolio) {
            fs.unlink(portfolio.imageSrc[req.body.id], err => { });
            portfolio.imageSrc.set(req.body.id, req.file.path)
            portfolio.save();
        }
        res.status(201).json({
            resultCode: 0,
            id: req.body.id,
            photo: req.protocol + '://' + req.headers.host + '/' + req.file.path
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.deletePhoto = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (portfolio) {
            fs.unlink(portfolio.imageSrc[req.query.id], err => { });
            portfolio.imageSrc.splice(req.query.id, 1);
            portfolio.save();

            res.status(200).json({
                resultCode: 0,
                id: req.query.id
            });
        }
    } catch (e) {
        errorHandler(res, e);
    }
}