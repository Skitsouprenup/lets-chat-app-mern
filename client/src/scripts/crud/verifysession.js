import { getHostDomain } from "../utilities.js";
import { setActiveUser } from "./setactiveuser.js";

export const verifySession = (
    navigate, setLoading,
    setUsername, signal) => {
    const domain = getHostDomain();

    if (domain) {
        setLoading(true);
        const url = domain + '/api/users/verifysession';

        const request = new Request(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        fetch(request, { signal }).
            then((response) => {
                if (response.status === 200)
                    return response.json();
                else return undefined;
            }).
            then((data) => {
                if (data?.username) {
                    setUsername(data?.username);
                    setActiveUser(data?.username, setLoading);
                } else navigate(`/`);
            }).
            catch((e) => {
                if (!signal?.aborted) {
                    console.error(e);
                    setLoading(false);
                    navigate(`/`);
                }
            });
    } else console.error("Server Domain is missing!");
}