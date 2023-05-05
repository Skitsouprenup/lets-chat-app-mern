import React, { useState } from 'react';
import modalStyles from '../../../css/content/modals/modals.module.css';
import { v4 as uuidv4 } from 'uuid';

const CreateMeetingModal = ({ setModalComponent, socket }) => {
    const [loading, setLoading] = useState(false);
    const [roomId] = useState(uuidv4());

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
                                <h3>Create Meeting</h3>
                            </div>
                            <div className={modalStyles['headers-code']}>
                                <p>
                                    <span>
                                        Meeting Code:
                                    </span>
                                    <span>
                                        <em>{roomId}</em>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className={modalStyles['button-container']}>
                            <button
                                onClick={() => {
                                    const compData = {
                                        comp: 'MEETING',
                                        userType: 'HOST',
                                        roomId: roomId.toString()
                                    };

                                    socket.emit('join_room', compData);
                                    setLoading(true);
                                }}>
                                Create Meeting
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

export default CreateMeetingModal;