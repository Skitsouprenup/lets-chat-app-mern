import React, { useState } from 'react';
import modalStyles from '../../../css/content/modals/modals.module.css';
import { setUserPhoneNumber } from '../../../scripts/socketio/activeusers';

const SMSModal = (
    {
        setModalComponent,
        setSMSCallModal,
        username,
        socket }) => {
    const [phone, setPhone] = useState('');

    return (
        <div
            className={modalStyles['modal-container']}>
            <div
                className={modalStyles['modal-lightbox']}
                onClick={() => setModalComponent('')}></div>
            <div className={modalStyles['content-container']}>
                <div className={modalStyles['headers']}>
                    <div className={modalStyles['headers-title']}>
                        <h3>SMS message</h3>
                    </div>
                    <div className={modalStyles['headers-input']}>
                        <p>Phone Number(+)</p>
                        <input
                            type='input'
                            value={phone}
                            name='phoneNo'
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </div>
                <div className={modalStyles['button-container']}>
                    <button
                        disabled={phone.trim() ? false : true}
                        onClick={() => {
                            setUserPhoneNumber(socket, phone, username);
                            setModalComponent('');
                            setSMSCallModal({ type: 'SMS', phoneNo: phone });
                        }}>
                        Start SMS Chat
                    </button>
                    <button onClick={() => setModalComponent('')}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SMSModal;