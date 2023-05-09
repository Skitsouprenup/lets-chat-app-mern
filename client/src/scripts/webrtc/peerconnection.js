import { getLocalStream } from "../getAudioVIdeoPreview.js";
import { setMessages } from "../messagesgop.js";
import {
    addRemoteStreamToPanel,
    clearRemoteStreams,
    removeRemoteStreamFromPanel
} from "../remotestreamsop.js";

let peerConnections = [];

//Peer connection configuration
/*
    Note: 
    According to my observation, Google chrome 
    doesn't expose client's public ip address by default.
    Thus, we will get this error if we try to use STUN ICE servers
    in chrome:
    DOMException: Failed to construct 'RTCPeerConnection':
    ICE server parsing failed: Invalid hostname format

    The solution here is to use a TURN server. However, using
    TURN server breaks the peer-to-peer principle of webRTC since
    audio/video/data will now flow to the TURN servers making it
    an intermediary server.

    For some reason, the TURN server is not used when the STUN
    server throws the error above or if a STUN server is present 
    in iceServers array. Thus, I created a separate
    config for chrome and firefox. If a browser is not chrome,
    the first config is used.

    In development, we can leave the configuration blank. Although,
    the connections between peers are limited to local connection.
*/
//For firefox
const configuration = {
    iceServers: [
        {
            urls: 'stun: stun.i.google.com:13902',
        }
    ]
}

//For chrome
const turnConfig = {
    iceServers: [
        {
            urls: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
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
    const userAgent = window.navigator.userAgent;
    let peerConn = null;

    if (process.env.NODE_ENV === 'production') {
        if (userAgent.includes('Chrome')) {
            peerConn = new RTCPeerConnection(turnConfig);
        }
        else peerConn = new RTCPeerConnection(configuration);
    } else peerConn = new RTCPeerConnection();

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
