import React from 'react';
import uaStyles from '../../../css/content/hub/useractions.module.css';
import checkUserVirtualNo from '../../../scripts/crud/checkUserVirtualNo.js';

const UserActions = (props) => {
    return (
        <div className={uaStyles['user-actions-container']}>
            <div className={uaStyles['vertical-rule']}></div>
            <div className={uaStyles['user-actions']}>

                <div>
                    <h3>Hello {props.username}!</h3>
                </div>
                <div>
                    <div className={uaStyles['input-fields']}>
                        <input
                            type="input"
                            placeholder='Enter Meeting Code'
                            name="meeting-code-input"
                            value={props.meetingCode}
                            onChange={(e) => props.setMeetingCode(e.target.value)} />
                        <button onClick={() => props.setModalComponent('JOIN_MEETING')}>
                            Join Meeting
                        </button>
                    </div>
                    <div className={uaStyles['input-fields']}>
                        <button onClick={() => {
                            props.setModalComponent('CREATE_MEETING')
                        }}>
                            Create Meeting
                        </button>
                        <button onClick={() => {
                            checkUserVirtualNo(
                                props.username,
                                props.setModalMessage, 
                                props.setModalComponent, 
                                'SMS_MESSAGE',
                            );
                        }}>
                            SMS Message
                        </button>
                        <button onClick={() => {
                            checkUserVirtualNo(
                                props.username,
                                props.setModalMessage, 
                                props.setModalComponent, 
                                'MAKE_A_CALL',
                            );
                        }}>
                            Make a Call
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default UserActions;