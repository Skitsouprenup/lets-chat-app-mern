import React, { useState } from 'react';
import styles from '../../../css/content/meetingroom/meetchatbox.module.css';

import { broadCastChatMsg } from '../../../scripts/webrtc/broadcastchat';

import { BiPaperPlane } from "react-icons/bi";

const MeetChatBox = ({ messages, setMessagesToList }) => {
    const [inputMessage, setInputMessage] = useState('');

    return (
        <>
            {/*
            <div className={styles['info-container']}>
                <p>People(0)</p>
            </div>
            */}

            <div className={styles['chat-msg-container']}>
                {
                    messages.map((message, index) => {
                        return (
                            <div key={`chat-message-${index}`}>
                                {
                                    message.userType === 'USER' ?
                                        <>
                                            <div>
                                                <p className={styles['user-chat']}>
                                                    {message.message}
                                                </p>
                                            </div>
                                            <div></div>
                                        </> :
                                        <>
                                            <div></div>
                                            <div className={styles['peer-chat-container']}>
                                                <p className={styles['peer-chat']}>
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

            <div className={styles['chat-input-container']}>
                <div>
                    <textarea
                        value={inputMessage}
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