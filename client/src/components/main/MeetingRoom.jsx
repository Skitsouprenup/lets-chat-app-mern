import React, { useRef, useState, useEffect } from 'react';
import styles from '../../css/main/meetingroom.module.css';
import avtStyles from '../../css/content/hub/audiovidtest.module.css';
import {
    BiMicrophone, BiMicrophoneOff, BiVideo,
    BiVideoOff, BiChat, BiExit
} from "react-icons/bi";
import { useCamMicToggle } from '../../customhooks/usecammictoggle';
import MeetChatBox from '../content/meetingroom/MeetChatBox';

import {
    clearMessages, setMessagesState, unSetMessagesState,
    setMessages as setMessagesToList
} from '../../scripts/messagesgop.js';

const MeetingRoom = (
    { setHubComponent,
        remoteStreams,
        leaveSocketFromRoom,
        connectWithPeersInRoom }) => {

    const [enableCam, setEnableCam] = useState(false);
    const [enableMic, setEnableMic] = useState(false);
    const [camNotDetected, setCamNotDetected] = useState(true);
    const [micNotDetected, setMicNotDetected] = useState(true);

    const [enableChat, setEnableChat] = useState(false);
    const [messages, setMessages] = useState([]);

    const vidFrame = useRef(null);
    const attendeesVidPanel = useRef(null);

    useEffect(() => {
        clearMessages();
        return () => clearMessages();
    }, []);

    useEffect(() => {
        setMessagesState(setMessages);
        return () => unSetMessagesState();
    }, [messages]);

    useEffect(() => {
        const vidList = attendeesVidPanel.current.querySelectorAll('video');

        if (vidList.length === remoteStreams.length) {
            for (let i = 0; i < vidList.length; i++) {
                vidList[i].srcObject = remoteStreams[i].remoteStream;
                vidList[i].onloadedmetadata = () => {
                    vidList[i].play();
                };
            }
        }
    }, [remoteStreams]);

    const peerReady = useRef(false);
    useEffect(() => {
        if (peerReady.current) return;

        connectWithPeersInRoom(vidFrame, setCamNotDetected, setMicNotDetected);

        return () => peerReady.current = true;
    }, []);

    useCamMicToggle(vidFrame, enableCam, enableMic);

    return (
        <div className={styles['meetingroom-container']}>
            <div className={styles['top-container']}>
                <div className={styles['videos-container']}>
                    <video
                        className={
                            styles[
                            !enableChat ? 'host-tiny-vid-frame' :
                                'host-tiny-vid-frame-chat-on'
                            ]}
                        autoPlay={true}
                        muted
                        ref={vidFrame}>
                        Video Not Supported
                    </video>
                    <div
                        className={styles['attendees-vids-panel']}
                        ref={attendeesVidPanel}>
                        {
                            /*
                                Fill up this div with <video> 
                                elements based on the number of
                                remote streams
                             */
                            remoteStreams.map((_item, index) => {
                                return (
                                    <div key={`attendees-vid-cont-${index}`}>
                                        <video
                                            autoPlay={true}
                                            key={`attendees-vid-${index}`}>
                                            Video Not Supported
                                        </video>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                {
                    enableChat ?
                        <div className={styles['chat-container']}>
                            <MeetChatBox
                                messages={messages}
                                setMessagesToList={setMessagesToList} />
                        </div> : null
                }
            </div>
            <div className={styles['bottom-container']}>
                <button
                    onClick={() => setEnableCam(!enableCam)}
                    disabled={camNotDetected}
                    className={avtStyles[
                        enableCam ? 'button-enable' : 'button-disable'
                    ]}>
                    {enableCam ?
                        <BiVideo size='2em' /> :
                        <BiVideoOff size='2em' />
                    }
                </button>
                <button
                    className={avtStyles['button-enable']}
                    onClick={() => {
                        leaveSocketFromRoom();
                        setHubComponent({});
                    }}>
                    <BiExit size='2em' />
                </button>
                <button
                    onClick={() => setEnableMic(!enableMic)}
                    className={avtStyles[
                        enableMic ? 'button-enable' : 'button-disable'
                    ]}
                    disabled={micNotDetected}>
                    {enableMic ?
                        <BiMicrophone size='2em' /> :
                        <BiMicrophoneOff size='2em' />
                    }
                </button>
                <button
                    onClick={() => setEnableChat(!enableChat)}
                    className={
                        enableChat ?
                            styles['chat-btn-active'] :
                            avtStyles['button-enable']
                    }>
                    <BiChat size='2em' />
                </button>
            </div>
        </div>
    );
};

export default MeetingRoom;