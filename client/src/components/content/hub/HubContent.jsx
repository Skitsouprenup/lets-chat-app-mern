import React, { useEffect, useState } from 'react';
import styles from '../../../css/content/hub/hubcontent.module.css';
import Logo from '../../../assets/images/Main_logo.png';

import { BiLogOutCircle } from "react-icons/bi";
import AudioVideoPreview from './AudioVideoPreview';
import UserActions from './UserActions';
import MeetingRoom from '../../main/MeetingRoom';
import ModalComponent from './ModalComponent';
import io from 'socket.io-client';
import SMSCallModal from './SMSCallModal';

import {
    setRemoteStreamsState,
    unSetRemoteStreamsState
} from '../../../scripts/remotestreamsop';
import { setActiveUser } from '../../../scripts/socketio/activeusers';
import {
    removeSMSNotifEvts,
    smsNotifEvts
} from '../../../scripts/socketio/smsevts';
import { closePeerConnections } from '../../../scripts/webrtc/peerconnection';

import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../../../scripts/crud/logoutuser';
import {
    getCallOperations,
    instantiateSinchClient,
    terminateSinchClient
} from '../../../scripts/sinch/sinchclientwrapper';
import { useVerifyUserSession } from '../../../customhooks/useverifyusersession';
import useInitSocketIoEvents from '../../../customhooks/hubcontentuseeffects/useinitsocketioevents';
import { getHostDomain } from '../../../scripts/utilities';

const socket = io.connect(getHostDomain(), {
    autoConnect: false
});

const HubContent = () => {
    const [smsCallModal, setSMSCallModal] = useState({});
    const [modalComponent, setModalComponent] = useState('');
    const [hubComponent, setHubComponent] = useState({});

    const [meetingCode, setMeetingCode] = useState('');
    const [remoteStreams, setRemoteStreams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const leaveSocketFromRoom = () => {
        if (hubComponent?.roomId) {
            socket.emit('leave_room', hubComponent.roomId);
            closePeerConnections(socket, hubComponent.roomId);
        }
    }

    //Initialize Remote Streams for meeting room
    useEffect(() => {
        setRemoteStreamsState(setRemoteStreams);
        return () => unSetRemoteStreamsState();
    }, [remoteStreams]);

    //SMS notifications
    useEffect(() => {
        smsNotifEvts(socket, smsCallModal, username);

        return () => removeSMSNotifEvts(socket);
    }, [smsCallModal]);

    //Verify User Session
    useVerifyUserSession(navigate, setLoading, setUsername);
    //Init socket.io events
    useInitSocketIoEvents(socket, setHubComponent, setModalComponent);

    //Set user as active and setup sinch client
    useEffect(() => {
        if (loading) return;

        setActiveUser(socket,
            {
                username,
                phoneNo: ''
            });
        instantiateSinchClient(username);
        getCallOperations().setCallModalStateSetter(setSMSCallModal);
    }, [username, loading]);

    //get smsCallModal state to check if a user has active modal.
    //A user with active modal can't be called.
    useEffect(() => {
        if (getCallOperations()) {

            if (smsCallModal?.type)
                getCallOperations().setModalState(smsCallModal.type);
            if (hubComponent?.comp)
                getCallOperations().setModalState(hubComponent.comp);

        }

    }, [smsCallModal]);

    //Loading Screen
    if (loading) {
        return <div className={styles['loading-screen']}>
            <h3>Loading...</h3>
        </div>
    }

    return (
        <>
            {hubComponent?.comp === 'MEETING' ?
                <MeetingRoom
                    setHubComponent={setHubComponent}
                    remoteStreams={remoteStreams}
                    leaveSocketFromRoom={leaveSocketFromRoom} /> :
                <>
                    <ModalComponent
                        socket={socket}
                        modalComponent={modalComponent}
                        setModalComponent={setModalComponent}
                        meetingCode={meetingCode}
                        setSMSCallModal={setSMSCallModal}
                        username={username} />
                    <SMSCallModal
                        smsCallModal={smsCallModal}
                        setSMSCallModal={setSMSCallModal} />

                    <div className={styles['hubcontent-container']}>
                        <div className={styles['navbar']}>
                            <img src={Logo} alt="logo" className={styles['main-logo']} />
                            <div
                                className={styles['logout-button-text']}
                                aria-label='logout button'
                                onClick={() => {
                                    terminateSinchClient();
                                    logOutUser(navigate);
                                }}>
                                <BiLogOutCircle /><p>Logout</p>
                            </div>
                        </div>

                        <div className={styles['content-body']}>
                            <UserActions
                                setMeetingCode={setMeetingCode}
                                meetingCode={meetingCode}
                                setModalComponent={setModalComponent}
                                username={username} />
                            <AudioVideoPreview />
                        </div>
                    </div>
                </>}
        </>
    );
};

export default HubContent;