import React, { useState } from 'react';
import modalStyles from '../../../css/content/modals/modals.module.css';
import { setUserPhoneNumber } from '../../../scripts/socketio/activeusers';
import SMSCallProviderChoices from '../SMSCallProviderChoices';

const SMSModal = (
    {
        setModalComponent,
        setSMSCallModal,
        username,
        socket,
        modalMessage,
        setModalMessage, 
    }) => {
    const [phone, setPhone] = useState('');
    const [providerType, setProviderType] = 
        useState(modalMessage?.twilioVirtualNo ? 'Twilio' : 'Sinch');

    return (
        <div className={modalStyles['modal-container']}>
            <div className={modalStyles['modal-lightbox']}
                onClick={() => {
                    setModalComponent('');
                    setModalMessage({});
                }}></div>
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
                        setProviderType={setProviderType}
                        twilioVirtualNoActive={modalMessage?.twilioVirtualNo}
                        sinchVirtualNoActive={modalMessage?.sinchVirtualNo} />
                </div>
                <div className={modalStyles['button-container']}>
                    <button
                        disabled={phone.trim() ? false : true}
                        onClick={() => {
                            setUserPhoneNumber(socket, phone, username);
                            setModalComponent('');
                            setModalMessage({});
                            setSMSCallModal(
                                { 
                                    type: 'SMS', 
                                    phoneNo: phone,
                                    provider: providerType,
                                    username
                                }
                            );
                        }}>
                        Start SMS Chat
                    </button>
                    <button onClick={() => {
                        setModalComponent('');
                        setModalMessage({});
                    }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SMSModal;