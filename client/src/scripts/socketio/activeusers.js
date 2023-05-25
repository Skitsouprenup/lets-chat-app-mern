export const setUserPhoneNumber = (socket, number, username) => {
    socket.emit('server-set-user-phone-no', { number, username });
}