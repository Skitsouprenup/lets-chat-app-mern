import React, { useState } from 'react';
import styles from '../../css/credentials/login.module.css';
import Logo from '../../assets/images/Main_logo.png';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../scripts/crud/loginuser';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div className={styles['login-container']}>
            <form className={styles['login-form']} autoComplete="on">
                <img src={Logo} alt='logo' className={styles['login-logo']} />

                <div className={styles['input-wrapper']}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='input'
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="on"
                        disabled={loading} />
                </div>

                <div className={styles['input-wrapper']}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading} />
                </div>

                {
                    loading ?
                        <div className={styles['wait-div']}>
                            <p>Please Wait...</p>
                        </div> :
                        <div className={styles['login-buttons-wrapper']}>
                            <input
                                type='button'
                                value='Sign in'
                                id={styles['signin-button']}
                                onClick={() => {
                                    loginUser({
                                        username,
                                        password,
                                    }, navigate, setLoading);
                                }} />
                            <input
                                type='button'
                                value='Sign up'
                                onClick={() => navigate('./register')} />
                        </div>
                }

            </form>
        </div>
    );
};

export default Login;