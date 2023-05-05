export const verifySession = (
    navigate, setLoading,
    setUsername, signal) => {

    if (process.env.SERVER_DOMAIN) {
        setLoading(true);
        const url = process.env.SERVER_DOMAIN + '/api/users/verifysession';

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
                    navigate(`/hub`);
                    setUsername(data.username);
                    setLoading(false);
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