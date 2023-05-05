import { getPeerConnections } from "./peerconnection.js";

export const broadCastChatMsg = (message) => {
    for (const peerConn of getPeerConnections()) {
        peerConn.associatedDataCh.send(message);
    }
}