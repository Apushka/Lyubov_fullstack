const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const keys = require('./../config/keys')

module.exports.login = async (req, res) => {
        const candidate = await Admin.findOne({ email: req.body.email})

        if (candidate) {
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
            if (passwordResult) {
                const token = jwt.sign({
                    email: candidate.email,
                    adminId: candidate._id
                }, keys.jwt , {expiresIn: 60 * 60})

                res.status(200).json({
                    resultCode: 0,
                    email: candidate.email,
                    token: `Bearer ${token}`
                })
            } else {
                res.status(401).json({
                    error: 'Wrong email or password'
                })
            }
        } else {
            res.status(404).json({
                error: 'Admin not found'
            })
        }
}

module.exports.logout = async (req, res) => {
    const candidate = await Admin.findOne({ email: req.query.email })
    if (candidate) {
        res.status(200).json({
            resultCode: 0
        })
    }
}

module.exports.register = async (req, res) => {
    const candidate = await Admin.findOne({ email: req.body.email})

    if (candidate) {
        res.status(409).json({
            error: 'User with this email already exists'
        })
    } else {

        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const admin = new Admin({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await admin.save()
            res.status(201).json({ admin })
        } catch (e) {
    
        }
    }

    
}