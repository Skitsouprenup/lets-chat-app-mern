import { useEffect } from "react"

export const useCamMicToggle = (vidFrame, enableCam, enableMic) => {

    useEffect(() => {
        if (vidFrame.current?.srcObject) {

            for (const track of vidFrame.current.srcObject.getTracks()) {
                if (track.kind === 'video') {
                    track.enabled = enableCam;
                    continue;
                }

                if (track.kind === 'audio') {
                    track.enabled = enableMic;
                }
            }
        }
    }, [enableCam, enableMic]);
}