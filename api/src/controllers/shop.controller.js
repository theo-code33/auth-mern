const Shop = require('../models/shop.model');
const User = require('../models/user.model')

const ShopController = {
    create: async (req, res) => {
        const { ...datas } = req.body
        const { user } = req

        const shop = new Shop({...datas, user: user._id})
        
        try {
            const userResponse = User.findByIdAndUpdate(user._id, {$push: {shops: shop._id}})
            if(!userResponse) return res.status(404).send({error: "User not found"})
            const newShop = await shop.save()
            res.status(201).send(newShop)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    },
    getAll: async (req, res) => {
        try {
            const shops = await Shop.find({}).populate('user')
            res.send(shops)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    },
    getShopByUser: async (req, res) => {
        const { user } = req
        try {
            const shops = await Shop.find({user: user._id}).populate('user')
            res.send(shops)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    },
    getOneById: async (req, res) => {
        const { id } = req.params
        try {
            const shop = await Shop.findById(id).populate('user')
            if(!shop) return res.status(404).send({error: "Shop not found"})
            res.send(shop)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }

}

module.exports = ShopController