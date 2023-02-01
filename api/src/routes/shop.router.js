const express = require('express')
const ShopController = require('../controllers/shop.controller')
const TokenMiddleware = require('../middlewares/token.middleware')
const router = express.Router()

router.get('/shops', ShopController.getAll)
router.get('/shop/:id', ShopController.getOneById)
router.get('/user-shops', TokenMiddleware, ShopController.getShopByUser)
router.post('/shops', TokenMiddleware, ShopController.create)
router.put('/shops/:id', TokenMiddleware, ShopController.update)
router.delete('/shops/:id', TokenMiddleware, ShopController.delete)

module.exports = router