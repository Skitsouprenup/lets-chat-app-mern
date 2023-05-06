const getHostDomain = () => {

    return process.env.NODE_ENV === 'production' ?
        process.env.SERVER_DOMAIN :
        process.env.LOCAL_CLIENT_DOMAIN;
}

module.exports = { getHostDomain };