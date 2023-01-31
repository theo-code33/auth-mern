const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthController = {
    signup: async (req, res) => {
        const { password, ...datas } = req.body
        console.log(datas);

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
    }
}

module.exports = AuthController