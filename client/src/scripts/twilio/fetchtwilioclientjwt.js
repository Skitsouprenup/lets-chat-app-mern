import { getHostDomain } from "../utilities.js";

export const fetchTwilioClientJWT = async (username) => {
    const url = getHostDomain() + '/api/twiliojwt';
    let result = '';

    const request = new Request(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });

    result = await fetch(request).
        then((resp) => {
            if (resp.status === 200) {
                return resp.json();
            }
            else console.error('Can\'t fetch Twilio JWT!');
        }).
        catch((err) => {
            console.error(err);
        });
    return result;
}