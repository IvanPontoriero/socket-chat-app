const moment = require('moment')

function formatMessage(user, text, time) {
    return {
        user,
        text,
        time: moment().format('hh:ss')
    }
}

module.exports = formatMessage;