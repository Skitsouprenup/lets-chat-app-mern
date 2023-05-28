import React, { useState, useEffect } from 'react';
import styles from '../../css/main/profile.module.css';
import EditInput from '../content/profile/EditInput';
import fetchUserProfile from '../../scripts/crud/fetchUserProfile';
import saveProfile from '../../scripts/crud/saveProfile';

const Profile = ({setHubComponent, username, setSMSCallModal}) => {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [twilioVirtualNo, setTwilioVirtualNo] = useState('');
    const [sinchVirtualNo, setSinchVirtualNo] = useState('');

    const [loading, setLoading] = useState(true);
    const [submittingForm, setSubmittingForm] = useState(false);
    const [editInput, setEditInput] = useState('');

    const saveChanges = (e) => {
        e.preventDefault();
        saveProfile({
            username,
            email,
            twilioVirtualNo,
            sinchVirtualNo
        }, setSubmittingForm, setSMSCallModal);
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetchUserProfile(
            username, 
            setFullName, 
            setEmail, 
            setTwilioVirtualNo, 
            setSinchVirtualNo, 
            setLoading, 
            signal
        );

        return () => {
            if (controller) controller.abort();
        }
    },[]);

    //Loading Screen
    if (loading) {
        return <div className={styles['loading-screen']}>
            <h3>Loading...</h3>
        </div>
    }

    return (
        <div className={styles['editinput-container']}>
            <div className={styles['input-container']}>
                <h2 className={styles['profile-text']}>
                    Profile
                </h2>
                <form>
                    <div className={styles['field']}>
                        <p><b>Username:</b></p>
                        <p>{username}</p>
                    </div>
                    <div className={styles['field']}>
                        <p><b>Fullname:</b></p>
                        <p>{fullname}</p>
                    </div>
                    <div className={styles['field']}>
                        <p><b>E-mail Address:</b></p>
                        {
                            !submittingForm ?
                            <EditInput 
                            input={email}
                            setInput={setEmail}
                            editInput={editInput}
                            setEditInput={setEditInput}
                            editInputType={'Email Address:'} /> : null
                        }
                    </div>

                    <div className={styles['subsection']}>
                        <h4 className={styles['virtualno-text']}>
                            Virtual Numbers
                        </h4>
                        <div>
                            <div className={styles['field']}>
                                <p><b>Twilio:</b></p>
                                {
                                    !submittingForm ?
                                    <EditInput 
                                    input={twilioVirtualNo}
                                    setInput={setTwilioVirtualNo}
                                    editInput={editInput}
                                    setEditInput={setEditInput}
                                    editInputType={'Twilio Virtual No.:'} /> : null
                                }
                            </div>
                            <div className={styles['field']}>
                                <p><b>Sinch:</b></p>
                                {
                                    !submittingForm ?
                                    <EditInput 
                                    input={sinchVirtualNo}
                                    setInput={setSinchVirtualNo}
                                    editInput={editInput}
                                    setEditInput={setEditInput}
                                    editInputType={'Sinch Virtual No.:'} /> : null
                                }
                            </div>
                        </div>
                    </div>

                    {
                        !submittingForm ?
                            <div className={styles['button-container']}>
                            <button
                                onClick={saveChanges}>
                                Save Changes
                            </button>
                            <button
                                onClick={() => setHubComponent({})}>
                                Close
                            </button>
                        </div> : <p>Please Wait...</p>
                    }
                </form>
            </div>
        </div>
    );
};

export default Profile;