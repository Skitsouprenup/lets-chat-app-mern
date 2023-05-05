export const setActiveUser = (socket, userInfo) => {
    socket.emit('server-active-user', userInfo);
}

export const setUserPhoneNumber = (socket, number, username) => {
    socket.emit('server-set-user-phone-no', { number, username });
}