const { Schema, model } = require('mongoose')

class Chats {
    constructor() {
        this.schema = new Schema({
            user: { type: String, required: true },
            message: { type: String, required: true }
        }, {
            timestamps: true
        })

        this.model = model('Chats', this.schema)
    }

    async getAll() {
        const chats = await this.model.find()
        return chats
    }

    async saveMsg(res) {
        await this.model.create(...res)
    }
}

module.exports = new Chats()