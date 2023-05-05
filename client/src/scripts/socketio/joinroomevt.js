const clientEvents = [
    'join_success',
    'join_failed'
];

//Go to HubContent to register socket.io's events
export const joinRoomEvents = (socket, setHubComponent, setModalComponent) => {

    //Join success
    socket.on(clientEvents[0], (data) => {

        if (data.userType !== 'HOST') {
            socket.emit('server-broadcast-joined-socket', data.roomId);
        }
        setHubComponent({
            comp: data.comp,
            roomId: data.roomId
        });
        setModalComponent('');
    });

    //Join failed
    socket.on(clientEvents[1], (data) => {
        setHubComponent(data);
        setModalComponent('');
    });
}

export const removeJoinRoomEvents = (socket) => {
    for (const event of clientEvents) {
        socket.off(event);
    }
}