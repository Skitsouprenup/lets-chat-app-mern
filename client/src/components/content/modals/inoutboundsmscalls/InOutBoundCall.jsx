import React, { useState, useEffect } from 'react';
import CallLogo from '../../../../assets/images/call_logo.png';
import styles from '../../../../css/content/modals/inoutboundsmscalls/call.module.css';
import modalStyles from '../../../../css/content/modals/modals.module.css';
import { getSinchCallOperations } from '../../../../scripts/sinch/sinchclientwrapper.js';
import { getTwilioCallOperations } from '../../../../scripts/twilio/twilioclient';

const InOutBoundCall = ({
    input,
    setSMSCallModal,
    provider,
    isInbound = false,
    remoteUser = '',
    acceptHide = false }) => {

    const [callState, setCallState] = useState('');
    const [hideAccept, setHideAccept] = useState(acceptHide);

    const answerCall = () => {
        setHideAccept(true);
        switch(provider) {
            case 'Sinch':
                getSinchCallOperations().answerCall();
                break;

            case 'Twilio':
                getTwilioCallOperations().answerCall();
                break;
        }
    }

    const hangupCall = () => {
        switch(provider) {
            case 'Sinch':
                getSinchCallOperations().hangupCall();
                getSinchCallOperations().setModalState('');
                break;

            case 'Twilio':
                getTwilioCallOperations().hangupCall();
                getTwilioCallOperations().setSMSCallModalState('');
                break;
        }
        setSMSCallModal({});
    }

    //set Call Status
    useEffect(() => {
        switch(provider) {
            case 'Sinch':
                getSinchCallOperations().setCallStateSetter(setCallState);
                break;
            
            case 'Twilio':
                getTwilioCallOperations().setCallStatusSetter(setCallState);
                break;
        }
    }, [provider]);

    useEffect(() => {

        const timeout = null;
        if (callState === 'Call Ended') {
            setTimeout(() => {
                setSMSCallModal({});
                setCallState('');
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
                                    <p>Calling {input.slice(0, 6)}...</p> :
                                    <p>Call from {remoteUser.slice(0, 6)}...</p>
                            }
                            <p>{callState}</p>
                        </> : <p>{callState}</p>
                }
                {
                    (isInbound && !hideAccept) ?
                        <button
                            className={styles['modal-button']}
                            onClick={answerCall}>
                            Accept
                        </button> : null
                }
                {
                    callState !== 'Call Ended' ?
                        <button
                            className={styles['modal-button']}
                            onClick={hangupCall}>
                            Hang Up
                        </button> : null
                }
            </div>
        </div >
    );
};

export default InOutBoundCall;