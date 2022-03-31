const product = require('../models/productos.model')

module.exports = {
    getAll: async (req, res) => {
        try {
            const data = await product.getAll()
            console.log(data)
            res.render('index', {
                layout: 'layout',
                title:'CATALOGUE',
                products: data
            })
        } catch(err) {
            res.status(500).send({
                error: err.message
            })
        }
    },

    getForm: async (req, res) => {
        res.render('product-form', { layout: 'layout' })
    },

    addProduct: async (req, res) => {
        try {
            const { body } = req
    
            const data = await product.addProducts(body)
            res.render('product-form', { 
                layout: 'layout',
                success: 'Congratulations! You have successfully added a product.'
            })
        } catch(err) {
            res.status(500).send({
                error: err.message
            })
        }
    }
}