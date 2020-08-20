const moment = require('moment');

function formatMessage(message,userName){
    return{
        message,
        userName,
        time: moment().format('h:mm a')
    }
}
module.exports = formatMessage;