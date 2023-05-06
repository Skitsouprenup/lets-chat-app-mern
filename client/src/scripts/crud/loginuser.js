import { instantiateSinchClient } from '../sinch/sinchclientwrapper.js';
import { getHostDomain } from '../utilities.js';

export const loginUser = (credentials, navigate) => {
    const domain = getHostDomain();

    if (domain) {
        const url = domain + '/api/users/login';

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