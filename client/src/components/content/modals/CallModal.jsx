import React, { useState } from 'react';
import modalStyles from '../../../css/content/modals/modals.module.css';
import { getCallOperations } from '../../../scripts/sinch/sinchclientwrapper';

const CallModal = ({ setModalComponent, setSMSCallModal }) => {
    const [user, setUser] = useState('');

    return (
        <div
            className={modalStyles['modal-container']}>
            <div
                className={modalStyles['modal-lightbox']}
                onClick={() => setModalComponent('')}></div>
            <div className={modalStyles['content-container']}>
                <div className={modalStyles['headers']}>
                    <div className={modalStyles['headers-title']}>
                        <h3>Make a Call</h3>
                    </div>
                    <div className={modalStyles['headers-input']}>
                        <p>Username</p>
                        <input
                            type='input'
                            name='username'
                            value={user}
                            onChange={(e) => setUser(e.target.value)} />
                    </div>
                </div>
                <div className={modalStyles['button-container']}>
                    <button
                        disabled={user.trim() ? false : true}
                        onClick={() => {
                            setModalComponent('');
                            getCallOperations().makeCall(user);
                            setSMSCallModal({ type: 'CALL', user });
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