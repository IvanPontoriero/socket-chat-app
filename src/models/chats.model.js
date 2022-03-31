const { Schema, model } = require('mongoose')
const { normalize, schema } = require('normalizr')

class Chats {
    constructor() {
        this.schema = new Schema({
            author: { 
                firstname: { type: String, required: true},
                lastname: { type: String, required: true},
                email: { type: String, required: true},
                age: { type: number, required: true},
                username: { type: String, required: true },
                firstname: { type: String, required: true},
            },
            text: { type: String, required: true }
        })

        this.model = model('Chats', this.schema)
    }

    async getAll() {
        const chats = await this.model.find()
        return chats
    }

    async saveMsg(res) {
        await this.model.create(res)
    }

    async readMsg() {
        const author = new schema.Entity('author', {}, { idAttribute: 'email' })
        const msg = new this.schema.Entity('messages', {}, { 
            author: author
        })

        const data = new schema.Entity('data', {
            messages: [message]
        })

        const getMessages = await this.model.find({})
        const normalizedData = normalize({
            id: 'messages',
            menssages: getMessages
        }, data)

        return normalizedData
    }
}

module.exports = new Chats()