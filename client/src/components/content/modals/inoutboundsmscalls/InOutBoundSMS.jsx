import React, { useEffect, useState } from 'react';
import chatBoxStyles from '../../../../css/content/meetingroom/meetchatbox.module.css';
import modalStyles from '../../../../css/content/modals/modals.module.css';
import styles from '../../../../css/content/modals/inoutboundsmscalls/sms.module.css';
import { sendSMSToPhone } from '../../../../scripts/sms_calls/sendsmstophone';

import { BiPaperPlane } from "react-icons/bi";

import {
    clearMessages, setMessagesState, unSetMessagesState,
    setMessages as setMessagesToList
} from '../../../../scripts/messagesgop.js';

const InOutBoundSMS = ({ phoneNo, setSMSCallModal }) => {
    const [message, setMessage] = useState('');
    const [messageStatus, setMessageStatus] = useState('READY');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (messageStatus === 'SENT') {
            setMessagesToList(message, 'USER');
            setMessage('');
            setMessageStatus('READY');
        }
        else setMessageStatus('READY');
    }, [messageStatus]);

    useEffect(() => {
        clearMessages();
        return () => clearMessages();
    }, []);

    useEffect(() => {
        setMessagesState(setMessages);
        return () => unSetMessagesState();
    }, [messages]);

    return (
        <div className={modalStyles['modal-container']}>
            <div
                className={modalStyles['modal-lightbox']}
                onClick={() => {
                    setSMSCallModal({});
                }}></div>
            <div className={styles['content-container']}>
                <div className={chatBoxStyles['info-container']}>
                    <p>To: {phoneNo.slice(0, 5)}...</p>
                </div>

                <div className={chatBoxStyles['chat-msg-container']}>
                    {
                        messages.map((message, index) => {
                            return (
                                <div key={`chat-message-${index}`}>
                                    {
                                        message.userType === 'USER' ?
                                            <>
                                                <div>
                                                    <p className={chatBoxStyles['user-chat']}>
                                                        {message.message}
                                                    </p>
                                                </div>
                                                <div></div>
                                            </> :
                                            <>
                                                <div></div>
                                                <div className={chatBoxStyles['peer-chat-container']}>
                                                    <p className={chatBoxStyles['peer-chat']}>
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </>
                                    }
                                </div>
                            );
                        })
                    }
                </div>

                <div className={chatBoxStyles['chat-input-container']}>
                    <div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <button
                        disabled={messageStatus === 'READY' ? false : true}
                        onClick={() =>
                            sendSMSToPhone({ message, phoneNo }, setMessageStatus)}>
                        <BiPaperPlane size='1.75em' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InOutBoundSMS;