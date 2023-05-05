import React, { useState } from 'react';

import modalStyles from '../../../css/content/modals/modals.module.css';

const JoinMeetingModal = ({ meetingCode, setModalComponent, socket }) => {
    const [loading, setLoading] = useState(false);

    return (
        <div
            className={modalStyles['modal-container']}>
            {!loading ?
                <>
                    <div
                        className={modalStyles['modal-lightbox']}
                        onClick={() => setModalComponent('')}></div>
                    <div className={modalStyles['content-container']}>
                        <div className={modalStyles['headers']}>
                            <div className={modalStyles['headers-title']}>
                                <h3>Join Meeting</h3>
                            </div>
                            <div className={modalStyles['headers-code']}>
                                <p>
                                    <span>
                                        Meeting Code:
                                    </span>
                                    <span>
                                        <em>{meetingCode ? meetingCode : 'None'}</em>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className={modalStyles['button-container']}>
                            <button
                                onClick={() => {
                                    const compData = {
                                        comp: 'MEETING',
                                        userType: 'ATTENDEE',
                                        roomId: meetingCode
                                    };

                                    socket.emit('join_room', compData);
                                    setLoading(true);
                                }}
                                disabled={meetingCode ? false : true}>
                                Join Meeting
                            </button>
                            <button onClick={() => setModalComponent('')}>
                                Close
                            </button>
                        </div>
                    </div>
                </> : <h3>Loading...</h3>}
        </div>
    );
};

export default JoinMeetingModal;