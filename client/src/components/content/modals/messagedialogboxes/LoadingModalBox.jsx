import React from 'react';
import styles from '../../../../css/content/modals/modals.module.css';

const LoadingModalBox = () => {
  return (
    <div className={styles['modal-container']}>
        <div className={styles['modal-lightbox']}>
        </div>
        <div className={styles['content-container-centered']}>
            <h2>Please Wait...</h2>
            <p>Refresh the page to cancel</p>
        </div>
    </div>
  );
};

export default LoadingModalBox;