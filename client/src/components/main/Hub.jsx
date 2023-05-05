import React from 'react';
import styles from '../../css/main/hub.module.css';
import HubContent from '../content/hub/HubContent';

const Hub = () => {
    return (
        <div className={styles['hub-container']}>
            <HubContent />
        </div>
    );
};

export default Hub;