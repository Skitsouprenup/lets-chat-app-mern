import React, { useState } from 'react';
import modalStyles from '../../../css/content/modals/modals.module.css';
import { setUserPhoneNumber } from '../../../scripts/socketio/activeusers';
import SMSCallProviderChoices from '../SMSCallProviderChoices';

const SMSModal = (
    {
        setModalComponent,
        setSMSCallModal,
        username,
        socket }) => {
    const [phone, setPhone] = useState('');
    const [providerType, setProviderType] = useState('Twilio');

    return (
        <div className={modalStyles['modal-container']}>
            <div
                className={modalStyles['modal-lightbox']}
                onClick={() => setModalComponent('')}></div>
            <div className={modalStyles['content-container-sms-call-modal']}>
                <div className={modalStyles['top-content']}>
                    <div className={modalStyles['top-content-title']}>
                        <h3>SMS message</h3>
                    </div>
                    <div className={modalStyles['top-content-input']}>
                        <p>Phone Number(+)</p>
                        <input
                            type='input'
                            value={phone}
                            name='phoneNo'
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <SMSCallProviderChoices
                        providerType={providerType}
                        setProviderType={setProviderType} />
                </div>
                <div className={modalStyles['button-container']}>
                    <button
                        disabled={phone.trim() ? false : true}
                        onClick={() => {
                            setUserPhoneNumber(socket, phone, username);
                            setModalComponent('');
                            setSMSCallModal(
                                { 
                                    type: 'SMS', 
                                    phoneNo: phone,
                                    provider: providerType, 
                                }
                            );
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