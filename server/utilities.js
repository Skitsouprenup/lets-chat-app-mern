const { getActiveUsers } = require('./src/socketio/activeusers.js');

const getHostDomain = () => {

    return process.env.NODE_ENV === 'production' ?
        process.env.SERVER_DOMAIN :
        process.env.LOCAL_CLIENT_DOMAIN;
}

const getVirtualNo = (provider, username) => {
    let virtualNo = '';
    for(const activeUser of getActiveUsers()) {
        if(activeUser.username === username) {
            virtualNo = getProviderVirtualNo(provider, activeUser);
            break;
        }
    }
    return virtualNo;
}

const getProviderVirtualNo = (provider, target) => {
    switch(provider) {
        case 'Twilio':
            return target.twilioVirtualNo;

        case 'Sinch':
            return target.sinchVirtualNo;
        
        default:
            return '';
    }
}

module.exports = { getHostDomain, getVirtualNo };