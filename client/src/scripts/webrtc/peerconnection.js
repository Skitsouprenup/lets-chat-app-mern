import { getLocalStream } from "../getAudioVIdeoPreview.js";
import { setMessages } from "../messagesgop.js";
import {
    addRemoteStreamToPanel,
    clearRemoteStreams,
    removeRemoteStreamFromPanel
} from "../remotestreamsop.js";

let peerConnections = [];

//Peer connection configuration
const configuration = {
    iceServers: [
        {
            urls: 'stun: stun.i.google.com:13902'
        }
    ]
}

export const getPeerConnections = () => {
    return peerConnections;
}

export const closePeerConnections = (socket, roomId) => {

    for (const conn of peerConnections) {
        conn.connection.close();
    }
    peerConnections = [];
    clearRemoteStreams();
    socket.emit('server-peer-disconnected', socket.id, roomId);
}

export const removeDisconnectedPeer = (peerId) => {

    removeRemoteStreamFromPanel(peerId);
    peerConnections = peerConnections.filter((conn) => {
        return conn.peerId !== peerId;
    });
}

//Note: peerId is the ID of the other peer that is connected
//to this peer connection
export const createPeerConnection = (peerId, socket) => {
    const peerConn =
        new RTCPeerConnection(
            process.env.NODE_ENV === 'production' ?
                configuration :
                {}
        );
    const dataChannel = peerConn.createDataChannel('chat');

    peerConn.ondatachannel = (event) => {
        const dataChannel = event.channel;

        //Data that has been sent by other peer
        //has been received.
        dataChannel.onmessage = (event) => {
            setMessages(event.data, 'PEER');
        }
    }

    peerConn.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit(
                'server-receive-ice',
                {
                    receiver: peerId,
                    sender: socket.id,
                    candidate: event.candidate
                });
        }
    }

    peerConn.ontrack = (event) => {
        addRemoteStreamToPanel(event.track, peerId);
    }

    //Add track to peer connection
    for (const track of getLocalStream().getTracks()) {
        peerConn.addTrack(track, getLocalStream());
    }

    return { peerConn, dataChannel };
}

export const addPeer = (peerConnObj) => {
    peerConnections.push(peerConnObj);
}
