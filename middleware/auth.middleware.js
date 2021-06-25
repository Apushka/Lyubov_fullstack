const keys = require("../config/keys");
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        jwt.verify(token, keys.jwt, function (err, decoded) {
            if (!token || err) {
                return res.status(200).json({
                    resultCode: 1,
                    error: 'Ошибка авторизации. Попробуйте авторизироваться снова'
                })
            } else {
                next();
            }
        })
    } catch (e) {
        res.status(200).json({
            resultCode: 1,
            error: 'Not authorized there'
        })
    }
}