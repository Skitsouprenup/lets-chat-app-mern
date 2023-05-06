import { getHostDomain } from "../utilities.js";

export const sendSMSToPhone = (messageInfo, setMessageStatus) => {
    const domain = getHostDomain();

    if (domain) {
        setMessageStatus('SENDING');

        const url = domain + '/api/sms/outboundsms';

        const request = new Request(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-store',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageInfo),
        });

        fetch(request).
            then((res) => {
                if (res.status !== 200) {
                    alert(
                        'Message can\'t be sent due to unknown reason\n' +
                        'Status code: ' + res.status);
                    setMessageStatus('FAILED');
                } else setMessageStatus('SENT');
            }).
            catch((e) => {
                console.error(e);
                setMessageStatus('FAILED');
            });

    }
    else console.error("Server Domain is missing!");
}