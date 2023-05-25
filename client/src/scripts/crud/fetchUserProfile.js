import { getHostDomain } from "../utilities.js";

const fetchUserProfile = 
    (
        username, 
        setFullName,
        setEmail,
        setTwilioVirtualNo,
        setSinchVirtualNo,
        setLoading,
        signal
     ) => {
        const domain = getHostDomain();

        if(domain) {
            const url = domain + '/api/users/userprofile?username='+username;

            const request = new Request(url, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-store',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                },
            });

            fetch(request, { signal }).
            then((resp) => {
                if(resp.status === 200)
                    return resp.json();
                else return undefined;
            }).
            then((data) => {
                if(data) {
                    setFullName(data?.fullname);
                    setEmail(data?.email);
                    setTwilioVirtualNo(data?.twilioVirtualNo);
                    setSinchVirtualNo(data?.sinchVirtualNo);
                }
                setLoading(false);
            }).
            catch((e) => {
                if (!signal?.aborted) {
                    console.error(e);
                    setLoading(false);
                }
            });

        } else console.error("Server Domain is missing!");
}

export default fetchUserProfile;