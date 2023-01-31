const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {
    updateProfile: async (req, res) => {
        let { email, currentPassword, newPassword, ...datas } = req.body
        const { user } = req
        
        if(email !== user.email) return res.status(400).send({error: "Invalid Email"})

        try {
            
            const userResponse = await User.findById({ _id: user._id }).select('+password')
            if(!userResponse) return res.status(404).send({error: 'User not found'})

            if(currentPassword && newPassword) {
                const result = await bcrypt.compare(currentPassword, userResponse.password)
                if(!result) return res.status(400).send({error: 'Invalid Password'})
                
                const hash = await bcrypt.hash(newPassword, 10)
                
                datas = {
                    ...datas,
                    password: hash
                }
            }

            for(let data in datas){
                if (datas[data] !== "") {
                    userResponse[data] = datas[data]
                }
            }

            await userResponse.save()
            
            const payload = {
                _id: userResponse._id,
                email: userResponse.email,
                firstName: userResponse.firstName,
                lastName: userResponse.lastName
            }

            const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 86400
            })
            res.status(201).send({ accessToken })
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
}

module.exports = UserController