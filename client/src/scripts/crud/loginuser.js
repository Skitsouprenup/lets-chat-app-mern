import { getHostDomain } from '../utilities.js';

export const loginUser = (credentials, navigate, setLoading) => {
    const domain = getHostDomain();

    if (domain) {
        setLoading(true);

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
            then(async (data) => {
                if (data) {
                    navigate('/hub');
                }
                setLoading(false);
            }).
            catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }
    else console.error("Server Domain is missing!");
}