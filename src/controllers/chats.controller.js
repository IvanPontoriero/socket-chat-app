const chats = require('../models/chats.model')
const moment = require('moment')

module.exports = {
    getChats: async (req, res) => {
        res.render('chat', {
            time: moment().format('hh:mm')
        })
    },

    loadData: async (req, res) => {
        await chats.saveMsg()
    }
}