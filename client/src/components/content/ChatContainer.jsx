import React, {useEffect, useState} from 'react';
import styles from '../../css/content/meetingroom/meetchatbox.module.css';
import { mediaQueryJS } from '../../scripts/utilities';

const ChatContainer = ({messages}) => {
    const [dummyDiv, setDummyDiv] = useState(true);

    //remove dummy div in the chatbox at a certain browser width
    useEffect(() => {
        const toggleDummyDiv =
            () => setDummyDiv(mediaQueryJS('only screen and (min-width: 500px)'));
        window.addEventListener('resize', toggleDummyDiv);

        return () => window.removeEventListener('resize', toggleDummyDiv);
    }, []);

    return (
        <div className={styles['chat-msg-container']}>
            {
                messages.map((message, index) => {
                    return (
                        <div key={`chat-message-${index}`}>
                            {
                                message.userType === 'USER' ?
                                    <>
                                        <div className={styles['user-chat-container']}>
                                            <p className={styles['user-chat']}>
                                                {message.message}
                                            </p>
                                        </div>
                                        {dummyDiv ? <div></div> : null}
                                    </> :
                                    <>
                                        {dummyDiv ? <div></div> : null}
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
    );
};

export default ChatContainer;