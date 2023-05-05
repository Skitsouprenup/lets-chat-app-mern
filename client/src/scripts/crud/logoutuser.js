export const logOutUser = (navigate) => {
    if (process.env.SERVER_DOMAIN) {
        const url = process.env.SERVER_DOMAIN + '/api/users/logout';

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