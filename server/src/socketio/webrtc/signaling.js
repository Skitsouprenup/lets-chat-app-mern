const webRTCSocketServerEvents = (socket) => {

    //Broadcast newly joined socket in a room.
    socket.on('server-broadcast-joined-socket', (roomId) => {
        socket.broadcast.to(roomId).
            emit('client-create-offer', socket.id);
    });

    //Handles exchanging ICE candidates between
    //peer connections
    socket.on('server-receive-ice', (data) => {
        const { receiver, sender, candidate } = data;
        socket.to(receiver).
            emit('client-receive-ice', {
                sender,
                candidate
            });
    });

    //receive offers from members of a room and give them
    //to the broadcaster
    socket.on('server-receive-offer', (data) => {
        const { broadCasterSocketId, offer, peerId } = data;
        socket.to(broadCasterSocketId).
            emit('client-handle-offer', { offer, peerId });
    });

    //receive answers from broadcaster and give them to
    //their respective offers 
    socket.on('server-receive-answer', (data) => {
        const { answer, receiverId, senderId } = data;
        socket.to(receiverId).
            emit('client-handle-answer', { answer, senderId });
    });

    //notify sockets in a room that a peer has been disconnected
    socket.on('server-peer-disconnected', (peerId, roomId) => {
        socket.broadcast.to(roomId).
            emit('client-remove-disconnected-peer', peerId);
    });
}

module.exports = { webRTCSocketServerEvents };