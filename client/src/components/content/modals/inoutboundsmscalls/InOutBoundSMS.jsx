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
import ChatContainer from '../../ChatContainer';

const InOutBoundSMS = ({ phoneNo, setSMSCallModal, provider }) => {
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
                <ChatContainer messages={messages}/>

                <div className={chatBoxStyles['chat-input-container']}>
                    <div>
                        <textarea
                            value={message}
                            name='chat-message-input'
                            onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <button
                        disabled={messageStatus === 'READY' ? false : true}
                        onClick={() =>
                            sendSMSToPhone(
                                { 
                                    message,
                                    phoneNo,
                                }, 
                                setMessageStatus, 
                                provider)}>
                        <BiPaperPlane size='1.75em' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InOutBoundSMS;