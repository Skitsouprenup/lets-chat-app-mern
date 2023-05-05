const { getActiveUsers } = require('../activeusers.js');

let messageQueue = null;
let ioRef = null;

const initSMSIo = (io) => {
    ioRef = io;
    messageQueue = [];
};

const addMessageToQueue = (data) => {
    messageQueue.push({
        username: data.username,
        message: data.message
    });
}

const confirmSMSNotifs = (socket) => {

    socket.on('server-confirm-sms-notif', (data) => {
        console.log(data);
        if (data?.status === 'ACCEPT')
            sendSMSToUser(
                {
                    username: data.username,
                    socketId: socket.id,
                });
        else {
            console.info(
                data.username +
                ' failed to confirm SMS notification'
            );

            for (let i = 0; i < messageQueue.length; i++) {
                if (messageQueue[i].username === data.username) {
                    messageQueue.splice(i, 1);
                    break;
                }
            }
        }
    });
};

//Use for inboundsms webhook
const notifyUserForSMS = (data) => {
    if (!ioRef || !getActiveUsers()) return;
    let user = undefined;

    user = getActiveUsers().find((user) => {
        return user.phoneNo === data.phoneNo;
    });

    if (user) {
        addMessageToQueue({
            username: user.username,
            message: data.message
        });
        ioRef.emit('client-notify-sms', user.username);
    }
    else {
        console.error('User doesn\'t exist!');
    }
};

const sendSMSToUser = (data) => {
    for (let i = 0; i < messageQueue.length; i++) {
        if (messageQueue[i].username === data.username) {
            ioRef.to(data.socketId).emit(
                'client-receive-sms',
                messageQueue[i].message);
            messageQueue.splice(i, 1);
            break;
        }
    }
};

module.exports = {
    initSMSIo,
    notifyUserForSMS,
    confirmSMSNotifs
};