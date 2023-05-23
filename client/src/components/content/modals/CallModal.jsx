import React, { useState } from 'react';
import modalStyles from '../../../css/content/modals/modals.module.css';
import { getSinchCallOperations } from '../../../scripts/sinch/sinchclientwrapper';
import { getTwilioCallOperations } from '../../../scripts/twilio/twilioclient';
import SMSCallProviderChoices from '../SMSCallProviderChoices';

const CallModal = ({ setModalComponent, setSMSCallModal }) => {
    const [input, setInput] = useState('');
    const [callType, setCallType] = useState('App');
    const [providerType, setProviderType] = useState('Twilio');

    const startCall = () => {
        setModalComponent('');

        switch(providerType) {
            case 'Sinch':
                getSinchCallOperations().makeCall(input, callType);
                break;

            case 'Twilio':
                getTwilioCallOperations().makeOutgoingCall(input);
                break;
        }

        setSMSCallModal(
            {
                type: 'CALL', 
                input,
                provider: providerType 
            });
    }

    return (
        <div className={modalStyles['modal-container']}>
            <div
                className={modalStyles['modal-lightbox']}
                onClick={() => setModalComponent('')}></div>
            <div className={modalStyles['content-container-sms-call-modal']}>
                <div className={modalStyles['top-content']}>
                    <div className={modalStyles['top-content-title']}>
                        <h3>Make a Call({callType})</h3>
                    </div>
                    <div className={modalStyles['top-content-input']}>
                        <p>{callType === 'App' ? 'Username' : 'Phone Number(+)'}</p>
                        <input
                            type='input'
                            name='userinput'
                            value={input}
                            onChange={(e) => setInput(e.target.value)} />
                    </div>
                    <SMSCallProviderChoices 
                        providerType={providerType}
                        setProviderType={setProviderType} />
                </div>
                <div className={modalStyles['button-container']}>
                    <button onClick={() => {
                        callType === 'App' ?
                            setCallType('PSTN') :
                            setCallType('App');
                    }}>
                        Switch to {callType === 'App' ? 'PSTN' : 'App'} call
                    </button>
                    <button
                        disabled={input.trim() ? false : true}
                        onClick={startCall}>
                        Start Call
                    </button>
                    <button onClick={() => setModalComponent('')}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallModal;