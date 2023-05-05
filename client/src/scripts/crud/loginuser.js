import { instantiateSinchClient } from '../sinch/sinchclientwrapper.js';

export const loginUser = (credentials, navigate) => {
    if (process.env.SERVER_DOMAIN) {
        const url = process.env.SERVER_DOMAIN + '/api/users/login';

        const request = new Request(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        fetch(request).
            then((resp) => {
                if (resp.status === 200) {
                    return resp.json();
                }
                else alert('Login failed.');
            }).
            then((data) => {
                if (data) {
                    instantiateSinchClient(data?.username);
                    navigate('/hub');
                }
            }).
            catch((err) => {
                console.error(err);
            });
    }
    else console.error("Server Domain is missing!");
}