let localStream = null;

export const getLocalStream = () => {
    return localStream;
}

export const getAudioVideoPreview =
    async (vidFrame, cancelLoading, setCamNotDetected, setMicNotDetected) => {
        if (cancelLoading.cancel) return;

        //If local stream already exist.
        //Note: this doesn't work on google chrome.
        //I only made this work on firefox. 
        //Once a MediaStream with audio track
        //is assigned to an unmuted <video>, It can't be
        //muted even a new <video> tag has set 'muted' to true.
        //Solution here is to instantiate a new MediaStream
        //and acquire the audio device again via 
        //navigator.mediaDevices.getUserMedia
        /*
        if (localStream != null) {
            for (const track of localStream.getTracks()) {
                if (track.kind === 'video') {
                    track.enabled = false;
                    setCamNotDetected(false);
                    continue;
                }
                if (track.kind === 'audio') {
                    track.enabled = false;
                    setMicNotDetected(false);
                }
            }

            if (vidFrame) {
                vidFrame.current.srcObject = localStream;
                vidFrame.onloadedmetadata = () => {
                    vidFrame.current.play();
                };
            }
            return;
        }
        */

        localStream = new MediaStream();

        try {
            const vidStream = await navigator.mediaDevices.getUserMedia({ video: true });
            /*
              Typically, There should be one video track available
              because we can only allow one video device.
            */
            vidStream.getTracks()[0].enabled = false;
            localStream.addTrack(vidStream.getTracks()[0]);
            setCamNotDetected(false);
        } catch (err) {
            if (!cancelLoading.cancel)
                console.log("Video Stream Error: " + err);
        }
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            /*
              Typically, There should be one audio track available
              because we can only allow one audio device.
            */
            audioStream.getTracks()[0].enabled = false;
            localStream.addTrack(audioStream.getTracks()[0]);
            setMicNotDetected(false);
        } catch (err) {
            if (!cancelLoading.cancel)
                console.log("Audio Stream Error: " + err);
        }

        if (cancelLoading.cancel) return;

        if (vidFrame) {
            vidFrame.current.srcObject = localStream;
            vidFrame.onloadedmetadata = () => {
                vidFrame.current.play();
            };
        }
    }