import { getHostDomain } from "../utilities.js";

export const logOutUser = (username, navigate) => {
    const domain = getHostDomain();

    if (domain) {
        const url = domain + `/api/users/logout?username=${username}`;

        const request = new Request(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'include'
        });

        fetch(request).
            then((resp) => {
                if (resp.status === 200) {
                    navigate('/');
                }
            }).
            catch((err) => {
                console.error(err);
            });
    }
    else console.error("Server Domain is missing!");
}