const AboutMe = require("../models/AboutMe");
const errorHandler = require("../utils/errorHandler")

module.exports.getAboutMe = async (req, res) => {
    try {
        const data = await AboutMe.findOne();
        if (data) {
            res.status(200).json({
                resultCode: 0,
                aboutInfo: data
            });
        }
    } catch (e) {
        errorHandler(res, e)
    }

}

module.exports.updateAboutMe = async (req, res) => {
    try {
        const newAboutInfo = {
            aboutMe: req.body.aboutMe
        }
        const updatedAboutInfo = await AboutMe.findOneAndUpdate(
            { _id: req.body },
            { $set: newAboutInfo },
            { new: true }
        )

        res.status(201).json({
            resultCode: 0,
            aboutInfo: updatedAboutInfo
        });
    } catch (e) {
        errorHandler(res, e);
    }

}
