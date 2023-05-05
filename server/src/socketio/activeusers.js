let activeUsers = [];

const getActiveUsers = () => {
    return activeUsers;
}

const activeUsersEvents = (socket) => {

    socket.on('server-active-user', (data) => {
        let exists = false;

        for (const user of activeUsers) {
            if (user.username === data.username) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            activeUsers.push({
                username: data.username,
                phoneNo: data.phoneNo
            });
        }
    });

    socket.on('server-set-user-phone-no', (data) => {
        for (let i = 0; i < activeUsers.length; i++) {
            if (activeUsers[i].username === data.username) {
                activeUsers[i].phoneNo = data.number;
                break;
            }
        }
    })
};

module.exports = { getActiveUsers, activeUsersEvents };