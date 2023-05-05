const joinRoom = (io, socket) => {
    socket.on('join_room', (userData) => {

        if (userData.userType === 'HOST') {
            socket.join(userData.roomId.toString());
            socket.emit('join_success',
                {
                    comp: userData.comp,
                    userType: userData.userType,
                    roomId: userData.roomId.toString()
                });
        }
        else {
            if (io.sockets.adapter.rooms.get(userData.roomId.toString())) {
                socket.join(userData.roomId.toString());
                socket.emit('join_success',
                    {
                        comp: userData.comp,
                        userType: userData.userType,
                        roomId: userData.roomId.toString()
                    });
            }
            else {
                socket.emit('join_failed', {});
            }
        }
    });

    socket.on('leave_room', (roomId) => {
        socket.leave(roomId);
    });
}

module.exports = { joinRoom };