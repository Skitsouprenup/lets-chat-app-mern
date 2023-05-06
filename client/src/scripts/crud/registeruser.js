import { getHostDomain } from "../utilities.js";

export const registerUser = (credentials, navigate, setLoading) => {
    const domain = getHostDomain();

    if (domain) {
        const url = domain + '/api/users/register';

        const request = new Request(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        setLoading(true);
        fetch(request).
            then((resp) => {
                if (resp.status === 201) {
                    alert('Registration Success!');
                    navigate('/');
                }
                else alert('Registration Failed!');

                setLoading(false);
            }).
            catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }
    else {
        console.error("Server Domain is missing!");
    }
}