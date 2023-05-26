import { getHostDomain } from "../utilities.js";

const checkUserVirtualNo = 
    (
        username,
        setModalMessage, 
        setModalComponent, 
        modalComponentType
    ) => {
    const domain = getHostDomain();

    if(domain) {
        setModalComponent('LOADING');
        const url = domain + '/api/users/checkvirtualno?username='+username;

        const request = new Request(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            },
        });

        fetch(request).
        then((resp) => {
            if(resp.status === 200)
                return resp.json();
            else return undefined;
        }).
        then((data) => {
            if(data) {
                setModalMessage(data);
                setModalComponent(modalComponentType);
            }
            else {
                setModalMessage(
                    {
                        message: 'Twilio or Sinch virtual number' +
                        ' is required to access this feature.\n\n'+
                        'Please add a virtual number to your profile.'
                    }
                );
                setModalComponent('INFO');
            }
        }).catch((e) => console.error(e));

    } else console.error("Server Domain is missing!");
};

export default checkUserVirtualNo;