let activeUsers = [];

const getActiveUsers = () => {
    return activeUsers;
}

const removeActiveUser = (username) => {

    for (let i = 0; i < activeUsers.length; i++) {
        if (activeUsers[i].username === username) {
            activeUsers.splice(i, 1);
            break;
        }
    }
}

const updateActiveUserVirtualNosInServer = (
    username,
    twilioVirtualNo,
    sinchVirtualNo) => {
        for(const user of activeUsers) {
            if(user.username === username) {
                user.sinchVirtualNo = sinchVirtualNo;
                user.twilioVirtualNo = twilioVirtualNo;
                break;
            }
        }
}

const activeUsersEvents = (socket) => {

    socket.on('server-set-user-phone-no', (data) => {
        for (let i = 0; i < activeUsers.length; i++) {
            if (activeUsers[i].username === data.username) {
                activeUsers[i].phoneNo = data.number;
                break;
            }
        }
    })
};

module.exports = { 
    getActiveUsers, 
    activeUsersEvents, 
    removeActiveUser,
    updateActiveUserVirtualNosInServer 
};