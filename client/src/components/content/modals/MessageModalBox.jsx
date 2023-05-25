import React from 'react';

const MessageModalBox = (
    {
        message,
        setModalComponent,
        width = 'auto', 
        height = 'auto'
    }) => {

    return (
        <div style={{
            width, height,
            display: 'flex', 
            'flex-direction' : 'column',
            'column-gap': '10px'
        }}>
            <div 
                className={styles['modal-lightbox']}
                onClick={() => setModalComponent('')}></div>
            <p>{message}</p>
            <button
                onClick={() => setModalComponent('')}>
                Close
            </button>
        </div>
    );
};

export default MessageModalBox;