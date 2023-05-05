let setRemoteStreamRef = null;
let remoteStreams = [];

export const setRemoteStreamsState = (stateSetter) => {
    setRemoteStreamRef = stateSetter;
};

export const unSetRemoteStreamsState = () => {
    setRemoteStreamRef = null;
}

export const clearRemoteStreams = () => {
    if (remoteStreams.length > 0)
        remoteStreams = [];
}

/*
This function will be called multiple times with very short interval.
Put the track in a global array first then put the array in state
array.

Don't put the streams directly to state array because react may
ignore previous calls on React.setStateAction function especially if the
function is called in quick succession. This is based on my observation
and this is the first time I encounter this kind of behavior.  
*/
export const addRemoteStreamToPanel = (track, connectedPeerId) => {
    if (setRemoteStreamRef === null)
        return;

    let exists = false;
    for (const stream of remoteStreams) {
        if (stream.connectedPeerId === connectedPeerId) {
            stream.remoteStream.addTrack(track);
            exists = true;
            break;
        }
    }

    if (!exists) {
        const remoteStream = new MediaStream();
        remoteStream.addTrack(track);
        remoteStreams.push({
            remoteStream,
            connectedPeerId
        });
    }

    //create new array for new hash value
    //So that component can re-render
    remoteStreams = [...remoteStreams];
    setRemoteStreamRef(remoteStreams);

};

export const removeRemoteStreamFromPanel = (connectedPeerId) => {
    if (setRemoteStreamRef == null)
        return;

    const filteredRemoteStreams =
        remoteStreams.filter((item) => {
            return item.connectedPeerId !== connectedPeerId;
        });
    remoteStreams = [...filteredRemoteStreams];
    setRemoteStreamRef(remoteStreams);
};