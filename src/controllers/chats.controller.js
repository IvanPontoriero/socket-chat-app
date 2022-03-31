const chats = require('../models/chats.model')
const moment = require('moment')

module.exports = {
    getChats: async (req, res) => {
        try {
            res.render('chat', {
                time: moment().format('hh:mm')
            })
        } catch(err) {
            res.status(500).send({
                error: err.message
            })
        }
    },

    sendUserData: async (req, res) => {
        try {
            
        } catch(err) {
            res.status(500).send({
                error: err.message
            })
        }
    },

    loadData: async (req, res) => {
        try {
            const { body } = req

            await chats.saveMsg(body)
        } catch(err) {
            res.status(500).send({
                error: err.message
            })
        }
    }
}