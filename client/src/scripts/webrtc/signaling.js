import {
    addPeer,
    createPeerConnection,
    removeDisconnectedPeer,
    getPeerConnections
} from "./peerconnection.js";

const clientEvents = [
    'client-create-offer',
    'client-handle-offer',
    'client-handle-answer',
    'client-receive-ice',
    'client-remove-disconnected-peer'
];

//Go to HubContent to register socket.io's events
export const webRTCSocketClientEvents = (socket) => {

    //Receivers
    //Create Offer
    socket.on(clientEvents[0], async (broadCasterSocketId) => {
        try {
            const { peerConn, dataChannel } =
                createPeerConnection(broadCasterSocketId, socket);
            const offer = await peerConn.createOffer();
            await peerConn.setLocalDescription(offer);

            addPeer(
                {
                    connection: peerConn,
                    associatedDataCh: dataChannel,
                    peerId: broadCasterSocketId
                });

            socket.emit(
                'server-receive-offer',
                {
                    offer,
                    broadCasterSocketId,
                    peerId: socket.id.toString()
                });
        } catch (e) { console.error(e); }
    });

    //Broadcaster
    //Handle Offers
    socket.on(clientEvents[1], async (data) => {
        try {
            const { peerConn, dataChannel } =
                createPeerConnection(data.peerId, socket);
            await peerConn.setRemoteDescription(data.offer);
            const answer = await peerConn.createAnswer();
            await peerConn.setLocalDescription(answer);

            addPeer({
                connection: peerConn,
                associatedDataCh: dataChannel,
                peerId: data.peerId
            });

            socket.emit('server-receive-answer',
                {
                    answer,
                    receiverId: data.peerId,
                    senderId: socket.id
                });
        } catch (e) { console.error(e); }
    });

    //Receivers
    //Handle Answer
    socket.on(clientEvents[2], async (data) => {
        const { answer, senderId } = data;
        try {
            for (const peerConn of getPeerConnections()) {
                if (peerConn.peerId === senderId)
                    await peerConn.connection.setRemoteDescription(answer);
            }
        }
        catch (e) {
            console.error('handle-answer error: ');
            console.error(e);
        }
    });

    //Receivers/Broadcaster
    //receives ICE candidates
    socket.on(clientEvents[3], async (data) => {
        const { sender, candidate } = data;

        try {
            for (const peerConn of getPeerConnections()) {
                if (peerConn.peerId === sender) {
                    await peerConn.connection.addIceCandidate(candidate);
                    break;
                }
            }
        }
        catch (e) {
            console.error('receive-ice event error: ');
            console.error(e);
        }
    });

    //remove disconnected peer
    socket.on(clientEvents[4], (peerId) => {
        removeDisconnectedPeer(peerId);
    });
}

export const removeWebRTCSocketClientEvents = (socket) => {

    for (const event of clientEvents) {
        socket.off(event);
    }
}