import { useEffect } from 'react';
import { verifySession } from '../scripts/crud/verifysession.js';

export const useVerifyUserSession = (navigate, setLoading, setUsername) => {
    //Verify User Session
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        verifySession(navigate, setLoading, setUsername, signal);

        return () => {
            if (controller) controller.abort();
        }
    }, []);
}