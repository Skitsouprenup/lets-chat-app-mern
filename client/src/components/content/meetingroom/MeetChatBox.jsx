import React, { useState } from 'react';
import styles from '../../../css/content/meetingroom/meetchatbox.module.css';

import { broadCastChatMsg } from '../../../scripts/webrtc/broadcastchat';

import { BiPaperPlane } from "react-icons/bi";
import ChatContainer from '../ChatContainer';

const MeetChatBox = ({ messages, setMessagesToList }) => {
    const [inputMessage, setInputMessage] = useState('');

    return (
        <>
            {/*
            <div className={styles['info-container']}>
                <p>People(0)</p>
            </div>
            */}
            <ChatContainer messages={messages}/>
            <div className={styles['chat-input-container']}>
                <div>
                    <textarea
                        value={inputMessage}
                        name='chat-message-input'
                        onChange={(e) => setInputMessage(e.target.value)}></textarea>
                </div>
                <button
                    onClick={() => {
                        setMessagesToList(inputMessage, 'USER');
                        broadCastChatMsg(inputMessage);
                        setInputMessage('');
                    }}>
                    <BiPaperPlane size='1.75em' />
                </button>
            </div>
        </>
    );
};

export default MeetChatBox;