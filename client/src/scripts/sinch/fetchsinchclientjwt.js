import { getHostDomain } from "../utilities.js";

export const fetchSinchClientJWT = async (userId) => {
    const url = getHostDomain() + '/api/sinchjwt';
    let result = '';

    const request = new Request(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    result = await fetch(request).
        then((resp) => {
            if (resp.status === 200) {
                return resp.json();
            }
            else console.error('Can\'t fetch SinchClient JWT!');
        }).
        catch((err) => {
            console.error(err);
        });
    return result;
}