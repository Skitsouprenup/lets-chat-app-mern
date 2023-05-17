import { getCallOperations } from "../sinch/sinchclientwrapper.js";

export const callNotifEvent = (socket, modalComponent, smsCallModal, loggedInUsername) => {
    socket.on('client-notify-call', async (data) => {
        if (modalComponent || smsCallModal?.type) {
            socket.emit('server-confirm-call-notif', {
                username: data.username,
                status: 'FAILED'
            });
            return;
        }

        if (loggedInUsername === data.username) {
            if (getCallOperations()) {
                socket.emit('server-confirm-call-notif', {
                    username: data.username,
                    socketId: socket.id,
                    status: 'ACCEPT',
                    confId: await getCallOperations().createConference(data.remoteNumber)
                });
            }
        }
        else {
            socket.emit('server-confirm-call-notif', {
                username: data.username,
                status: 'FAILED'
            });
        }
    });
}

export const removeCallNotifEvent = (socket) => {
    socket.off('client-notify-call');
}