const User = require('../models/user.model');
const ResetPassword = require('../models/resetPassword.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../../config/nodemailer.config');
const crypto = require('node:crypto');

const AuthController = {
    signup: async (req, res) => {
        const { password, ...datas } = req.body

        const hash = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ 
                ...datas,
                password: hash,
            })
            delete user.password
            res.send(user)
        } catch (error) {
            return res.status(400).send({ error:  error.message})
        }
    },
    signin: async (req, res) => {
        const { email, password } = req.body

        try {
            const user = await User.findOne({ email }).select('+password')

            if (!user) {
                return res.status(400).send({ error: 'User not found' })
            }

            const result = await bcrypt.compare(password, user.password)

            if(!result) {
                return res.status(400).send({ error: 'Invalid password' })
            }

            const payload = {
                _id: user._id,
                email,
                firstName: user.firstName,
                lastName: user.lastName
            }

            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 86400
            })

            res.send({ accessToken })
            
        } catch (error) {
            res.status(400).send({error: error.message})
        }
    },
    forgotPassword: async (req, res) => {
        const { email } = req.body
        const user = await User.findOne({ email })
        if(!user) return res.status(404).send({error: 'User not found'})
        const token = await ResetPassword.findOne({ user: user._id })

        if(token) {
            await token.deleteOne()
        }
        const resetToken = crypto.randomBytes(32).toString("hex");

        await new ResetPassword({
            user: user._id,
            token: resetToken

        }).save()

        const link = `http://localhost:3000/auth/reset-password/${resetToken}`

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Reset password',
            html: `<p>Click on the link to reset your password</p>
            <a href="${link}">${link}</a>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).send({error: error.message})
            }
            res.send({message: 'Email sent'})
        })
    },
    resetPassword: async (req, res) => {
        const { token, password } = req.body
        
        try {
            const passwordResetToken = await ResetPassword.findOne({ token })
                .populate('user')
                .exec()
            console.log(passwordResetToken);
            if(!passwordResetToken) return res.status(404).send({error: 'Token not found'})
    
            const hash = await bcrypt.hash(password, 10);
    
            await User.findByIdAndUpdate(passwordResetToken.user, { password: hash }, { new: true })
            await passwordResetToken.deleteOne()
            const payload = {
                _id: passwordResetToken._id,
                email: passwordResetToken.email,
                firstName: passwordResetToken.firstName,
                lastName: passwordResetToken.lastName
            }
            const newToken = await jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 86400
            })
            res.send({ accessToken: newToken })
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
}

module.exports = AuthController