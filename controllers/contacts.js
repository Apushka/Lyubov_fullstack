const errorHandler = require('../utils/errorHandler');
const nodemailer = require('nodemailer');
const keys = require('../config/keys');

module.exports.sendEmail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'apushkaa2.0@gmail.com',
            pass: keys.gmail
        }
    });
    try {
        const message = await transporter.sendMail({
            from: req.body.email,
            to: 'apushkaa2.0@gmail.com',
            subject: 'Новое сообщение от LyubovMua.com',
            html: `<div>
                <ul>
                    <li>От: </li>
                    <ul>
                        <li>${req.body.name}</li>
                        <li>${req.body.email}</li>
                        <li><a href='tel:${req.body.phone ? req.body.phone : ''}'>${req.body.phone ? req.body.phone : '-----------'}</a></li>
                    </ul>
                    <li>Тема: ${req.body.subject}</li>
                    <li></br>${req.body.message}</li>
                </ul>
            </div>
            `
        })
        res.status(201).json({
            resultCode: 0,
            message: message
        })

    } catch (e) {
        errorHandler(res, e)
    }

}