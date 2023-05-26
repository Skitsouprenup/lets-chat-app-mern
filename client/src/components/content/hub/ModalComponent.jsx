import React from 'react';

import CreateMeetingModal from '../modals/CreateMeetingModal';
import JoinMeetingModal from '../modals/JoinMeetingModal';
import SMSModal from '../modals/SMSModal';
import CallModal from '../modals/CallModal';

import InfoModalBox from '../modals/messagedialogboxes/InfoModalBox';
import LoadingModalBox from '../modals/messagedialogboxes/LoadingModalBox';

const ModalComponent = ({
    socket, modalComponent,
    setModalComponent, meetingCode,
    setSMSCallModal, username,
    modalMessage, setModalMessage
}) => {

    switch (modalComponent) {
        case 'JOIN_MEETING':
            return <JoinMeetingModal
                        meetingCode={meetingCode}
                        setModalComponent={setModalComponent}
                        socket={socket} />

        case 'CREATE_MEETING':
            return <CreateMeetingModal
                        setModalComponent={setModalComponent}
                        socket={socket} />

        case 'SMS_MESSAGE':
            return <SMSModal
                        setModalComponent={setModalComponent}
                        setSMSCallModal={setSMSCallModal}
                        username={username}
                        socket={socket} 
                        modalMessage={modalMessage}
                        setModalMessage={setModalMessage} />

        case 'MAKE_A_CALL':
            return <CallModal
                        setModalComponent={setModalComponent}
                        setSMSCallModal={setSMSCallModal}
                        modalMessage={modalMessage}
                        setModalMessage={setModalMessage} />

        case 'INFO':
            return <InfoModalBox 
                        setModalComponent={setModalComponent}
                        setModalMessage={setModalMessage}
                        modalMessage={modalMessage} />

        case 'LOADING':
            return <LoadingModalBox />

        default:
            return null;
    }
};

export default ModalComponent;