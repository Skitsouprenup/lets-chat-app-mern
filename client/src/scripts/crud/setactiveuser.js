import { getHostDomain } from "../utilities.js"

export const setActiveUser = (username, setLoading) => {
    const domain = getHostDomain();

    let result = true;
    if(domain){
        const url = domain + '/api/users/setactiveuser?username='+username;

        const request = new Request(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'include',
        });

        fetch(request).
        then((resp) => {
            if(resp.status !== 200) {
                alert('Can\'t set user as active!'+
                '\nStatus code: ' + resp.status);
                result = false;
            }

            setLoading(false);
        });

    }else {
        console.error("Server Domain is missing!");
        result = false;
    }
    return result;
}