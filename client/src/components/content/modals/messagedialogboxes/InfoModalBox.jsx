import React from 'react';
import styles from '../../../../css/content/modals/modals.module.css';

const InfoModalBox = (
    {
        modalMessage,
        setModalMessage,
        setModalComponent
    }) => {

    return (
        <div className={styles['modal-container']}>
            <div 
                className={styles['modal-lightbox']}
                onClick={() => {
                    setModalComponent('');
                    setModalMessage('');
                }}></div>
            <div className={styles['content-container-centered']}>
                <p>{modalMessage.message}</p>

                <div className={styles['button-container-not-stretched']}>
                    <button
                        onClick={() => {
                            setModalComponent('');
                            setModalMessage('');
                        }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoModalBox;