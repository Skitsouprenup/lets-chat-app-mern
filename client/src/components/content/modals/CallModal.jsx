import React, { useState } from 'react';
import modalStyles from '../../../css/content/modals/modals.module.css';
import { getCallOperations } from '../../../scripts/sinch/sinchclientwrapper';

const CallModal = ({ setModalComponent, setSMSCallModal }) => {
    const [input, setInput] = useState('');
    const [callType, setCallType] = useState('App');

    return (
        <div
            className={modalStyles['modal-container']}>
            <div
                className={modalStyles['modal-lightbox']}
                onClick={() => setModalComponent('')}></div>
            <div className={modalStyles['content-container']}>
                <div className={modalStyles['headers']}>
                    <div className={modalStyles['headers-title']}>
                        <h3>Make a Call({callType})</h3>
                    </div>
                    <div className={modalStyles['headers-input']}>
                        <p>{callType === 'App' ? 'Username' : 'Phone Number(+)'}</p>
                        <input
                            type='input'
                            name='userinput'
                            value={input}
                            onChange={(e) => setInput(e.target.value)} />
                    </div>
                </div>
                <div className={modalStyles['button-container']}>
                    <button onClick={() => {
                        callType === 'App' ?
                            setCallType('PSTN') :
                            setCallType('App')
                    }}>
                        Switch to {callType} call
                    </button>
                    <button
                        disabled={input.trim() ? false : true}
                        onClick={() => {
                            setModalComponent('');
                            getCallOperations().makeCall(input, callType);
                            setSMSCallModal({ type: 'CALL', input });
                        }}>
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