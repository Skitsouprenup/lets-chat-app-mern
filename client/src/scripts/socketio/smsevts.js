import { setMessages } from '../messagesgop.js';

//Go to HubContent to register socket.io's events
export const smsNotifEvts = (socket, smsCallModal, loggedInUsername) => {

    socket.on('client-notify-sms', (username) => {

        if (smsCallModal?.type !== 'SMS') {
            socket.emit('server-confirm-sms-notif', {
                username,
                status: 'FAILED'
            });
            return;
        }

        if (loggedInUsername === username) {
            socket.emit('server-confirm-sms-notif', {
                username,
                socketId: socket.id,
                status: 'ACCEPT'
            });
        }
    });

    socket.on('client-receive-sms', (message) => {
        if (smsCallModal?.type !== 'SMS') {
            console.error(
                'SMS Modal must be open in order' +
                ' to display the inbound SMS.'
            );
            return;
        }

        setMessages(message, 'PEER');
    });
}

export const removeSMSNotifEvts = (socket) => {
    socket.off('client-notify-sms');
    socket.off('client-receive-sms');
}