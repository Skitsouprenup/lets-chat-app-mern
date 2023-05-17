import React, { useState } from 'react';
import styles from '../../css/credentials/register.module.css';
import Logo from '../../assets/images/Main_logo.png';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../scripts/crud/registeruser';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullName] = useState('');

    return (
        <div className={styles['register-container']}>
            <form className={styles['register-form']} autoComplete="on">
                <img src={Logo} alt='logo' className={styles['register-logo']} />
                <h3>Register</h3>
                <div className={styles['input-wrapper']}>

                    <label htmlFor='username'>Username</label>
                    <input
                        type='input'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="on"
                        disabled={loading} />

                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading} />

                    <label htmlFor='e-mail'>E-mail</label>
                    <input
                        type='input'
                        id='e-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading} />

                    <label htmlFor='fullname'>Full Name</label>
                    <input
                        type='input'
                        id='fullname'
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={loading} />

                </div>
                {
                    loading ?
                        <div className={styles['wait-div']}>
                            <p>Please Wait...</p>
                        </div> :
                        <div className={styles['register-buttons-wrapper']}>
                            <input
                                type='button'
                                value='Create Account'
                                id={styles['create-button']}
                                onClick={() => {
                                    registerUser({
                                        username,
                                        password,
                                        email,
                                        fullname
                                    }, navigate, setLoading)
                                }} />
                            <input
                                type='button'
                                value='Cancel'
                                onClick={() => navigate('/')} />
                        </div>
                }
            </form>
        </div>
    );
};

export default Register;