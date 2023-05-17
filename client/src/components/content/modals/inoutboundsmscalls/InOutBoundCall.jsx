import React, { useState, useEffect } from 'react';
import CallLogo from '../../../../assets/images/call_logo.png';
import styles from '../../../../css/content/modals/inoutboundsmscalls/call.module.css';
import modalStyles from '../../../../css/content/modals/modals.module.css';
import { getCallOperations } from '../../../../scripts/sinch/sinchclientwrapper.js';

const InOutBoundCall = ({
    user,
    setSMSCallModal,
    isInbound = false,
    remoteUser = '',
    acceptHide = false }) => {

    const [callState, setCallState] = useState('');
    const [hideAccept, setHideAccept] = useState(acceptHide);

    useEffect(() => {
        getCallOperations().setCallStateSetter(setCallState);
    }, []);

    useEffect(() => {

        const timeout = null;
        if (callState === 'Call Ended') {
            setTimeout(() => {
                setSMSCallModal({});
            }, 2000);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [callState]);

    return (
        <div className={modalStyles['modal-container']}>
            <div className={modalStyles['modal-lightbox']}></div>
            <div className={styles['content-container']}>
                <img alt='logo' src={CallLogo} className={styles['call-logo']} />
                {
                    (callState !== 'Call Ended') ?
                        <>
                            {
                                !isInbound ?
                                    <p>Calling {user.slice(0, 6)}...</p> :
                                    <p>Call from {remoteUser.slice(0, 6)}...</p>
                            }
                            <p>{callState}</p>
                        </> : <p>{callState}</p>
                }
                {
                    (isInbound && !hideAccept) ?
                        <button
                            className={styles['modal-button']}
                            onClick={() => {
                                setHideAccept(true);
                                getCallOperations().answerCall();
                            }}
                        >
                            Accept
                        </button> : null
                }
                {
                    callState !== 'Call Ended' ?
                        <button
                            className={styles['modal-button']}
                            onClick={() => {
                                getCallOperations().hangupCall();
                                getCallOperations().setModalState('');
                                setSMSCallModal({});
                            }}>
                            Hang Up
                        </button> : null
                }
            </div>
        </div >
    );
};

export default InOutBoundCall;