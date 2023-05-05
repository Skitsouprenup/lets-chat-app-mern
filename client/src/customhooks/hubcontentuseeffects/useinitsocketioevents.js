import {
    joinRoomEvents,
    removeJoinRoomEvents
} from '../../scripts/socketio/joinroomevt.js';
import {
    webRTCSocketClientEvents,
    removeWebRTCSocketClientEvents
} from '../../scripts/webrtc/signaling.js';
import { useEffect } from 'react';

const useInitSocketIoEvents = (socket, setHubComponent, setModalComponent) => {
    useEffect(() => {

        if (!socket.isConnected) {
            socket.connect();
        }
        joinRoomEvents(socket, setHubComponent, setModalComponent);
        webRTCSocketClientEvents(socket);

        return () => {
            removeJoinRoomEvents(socket);
            removeWebRTCSocketClientEvents(socket);
        }

    }, []);
}

export default useInitSocketIoEvents;