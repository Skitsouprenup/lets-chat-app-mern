import React, { useState, useEffect, useRef } from 'react';
import avtStyles from '../../../css/content/hub/audiovidtest.module.css';

import {
  BiMicrophone,
  BiMicrophoneOff,
  BiVideo,
  BiVideoOff
} from "react-icons/bi";
import { getAudioVideoPreview } from '../../../scripts/getAudioVIdeoPreview';
import { useCamMicToggle } from '../../../customhooks/usecammictoggle';

const AudioVideoPreview = () => {
  const [enableCam, setEnableCam] = useState(false);
  const [enableMic, setEnableMic] = useState(false);
  const [camNotDetected, setCamNotDetected] = useState(true);
  const [micNotDetected, setMicNotDetected] = useState(true);

  const vidFrame = useRef(null);

  useEffect(() => {
    let cancelLoading = { cancel: false };
    getAudioVideoPreview(
      vidFrame, cancelLoading,
      setCamNotDetected, setMicNotDetected);

    return () => cancelLoading.cancel = true;
  }, []);

  useCamMicToggle(vidFrame, enableCam, enableMic);

  return (
    <div className={avtStyles['audio-vid-test-container']}>
      <div className={avtStyles['audio-vid-test']}>

        <div className={avtStyles['status-label-container']}>
          {camNotDetected ?
            <p className={avtStyles['status-label']}>Camera Not Available</p> : null}
          {micNotDetected ?
            <p className={avtStyles['status-label']}>Microphone Not Available</p> : null}
        </div>

        <video
          autoPlay={true}
          muted={false}
          ref={vidFrame}
          className={avtStyles['video-frame']}>Video Not Supported</video>
        <div className={avtStyles['button-container']}>
          <button className={avtStyles[
            enableCam ? 'button-enable' : 'button-disable'
          ]}
            onClick={() => setEnableCam(!enableCam)}
            disabled={camNotDetected}>
            {enableCam ?
              <BiVideo size='2em' /> :
              <BiVideoOff size='2em' />
            }
          </button>
          <button
            className={avtStyles[
              enableMic ? 'button-enable' : 'button-disable'
            ]}
            onClick={() => setEnableMic(!enableMic)}
            disabled={micNotDetected}>
            {enableMic ?
              <BiMicrophone size='2em' /> :
              <BiMicrophoneOff size='2em' />
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioVideoPreview;