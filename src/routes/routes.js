const { Router } = require('express')
const products = require('../controllers/productos.controller')
const chats = require('../controllers/chats.controller')

const router = Router()

//Routes  
router.get('/', products.getAll)

router.get('/addProduct', products.getForm)

router.post('/addProduct', products.addProduct)

router.get('/chat', chats.getChats)

module.exports = router