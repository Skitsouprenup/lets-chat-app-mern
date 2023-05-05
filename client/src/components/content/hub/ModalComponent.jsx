import React from 'react';

import CreateMeetingModal from '../modals/CreateMeetingModal';
import JoinMeetingModal from '../modals/JoinMeetingModal';
import SMSModal from '../modals/SMSModal';
import CallModal from '../modals/CallModal';

const ModalComponent = ({
    socket, modalComponent,
    setModalComponent, meetingCode,
    setSMSCallModal, username
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
                socket={socket} />

        case 'MAKE_A_CALL':
            return <CallModal
                setModalComponent={setModalComponent}
                setSMSCallModal={setSMSCallModal} />

        default:
            return null;
    }
};

export default ModalComponent;