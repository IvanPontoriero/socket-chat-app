const { Schema, model} = require('mongoose')
const { faker } = require('@faker-js/faker')

class Productos {
    constructor() {
        this.schema = new Schema({
            title: {type: String, required: true, max: 255},
            code: {type: Number, required: true, default: Math.floor((Math.random() * (99999 - 1)) + 1)},
            price: {type: Number, required: true},
            thumbnail: {type: String, required: true, max: 255},
            stock: { type: Number, default: 0}
        }, {
            timestamps: { createdAt: true, updatedAt: true }
        })

        this.model = model('Products', this.schema)
    }

    async getAll(){
        const products = await this.model.find({}, null, {sort: {title: 1}})
        console.log(`Productos en DB: ${products.length}`)
        return products
    }

    async addProducts(obj) {
        const product = await this.model.create(obj)
        console.log(JSON.stringify(product, null, 2))
        return product
    }

    async getFake() {
        const products = []

        for(let i = 0; i < 5; i++) {
            const product = {
                title: faker.commerce.productName(),
                price: faker.commerce.price(5000, 300000),
                timestamp: faker.date.recent(),
                code: faker.datatype.number({ min: 10000, max: 99999 }),
                thumbnail: faker.image.imageUrl(648, 540, 'fashion', true, true)
            }

            products.push(product)
        }

        return products
    }
}

module.exports = new Productos()