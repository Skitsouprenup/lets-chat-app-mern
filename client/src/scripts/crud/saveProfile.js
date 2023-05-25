import { getHostDomain } from "../utilities.js";


const saveProfile = (values) => {
        const domain = getHostDomain();

        if(domain) {
            const url = domain + '/api/users/saveprofile';

            const request = new Request(url, {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-store',
                credentials: 'include',
                headers: {
                    'Accept': 'text/plain application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            fetch(request).
            then((resp) => {
                if(resp.status === 201) {
                    alert('Changes has been saved!');
                    return undefined;
                }
                else if(resp.status === 200) { return resp.text(); }
                else {
                    alert('An error occured. Status code: ' + resp.status);
                    return undefined;
                }
            }).
            then((data) => {
                if(data) {
                    alert(data);
                }
            })
        } else console.error("Server Domain is missing!");
}

export default saveProfile;