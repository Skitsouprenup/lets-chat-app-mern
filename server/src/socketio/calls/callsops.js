const { getActiveUsers } = require('../activeusers.js');
const fetch = require('cross-fetch');
const { uuid } = require('uuidv4');

let ioRef = null;
let inboundCallResponse = null;
let contact = null;

const initCallIo = (io) => {
    ioRef = io;
}

const setInboundCallResponse = (response) => {
    inboundCallResponse = response;
}

const invitePhoneAndClientToConference = async (username) => {
    if (!inboundCallResponse) return;

    const confId = uuid();
    /*
        Note: Phone and client region must be the same in
        order for the conference to work. To know the designated
        region of an incoming call, look at the callResourceUrl
        property.
        Available Regions:
        https://developers.sinch.com/docs/voice/api-reference/#endpoints
    */
    //Invite client to conference
    await fetch(
        `https://calling-euc1.api.sinch.com/calling/v1/callouts`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + Buffer.from(
                    process.env.SINCH_CLIENT_APP_KEY + ':' +
                    process.env.SINCH_CLIENT_APP_SECRET).toString('base64')
            },
            body: JSON.stringify({
                method: 'conferenceCallout',
                conferenceCallout: {
                    destination: {
                        type: 'username',
                        endpoint: username
                    },
                    conferenceId: confId
                }
            })
        }
    );

    //connect inbound call to conference
    //phone region is expected to be in 'euc1' region
    inboundCallResponse.
        status(200).
        send({
            instructions: [
                {
                    name: "say",
                    text: "Connecting to Conference",
                    locale: "en-GB"
                }
            ],
            action: {
                name: "connectConf",
                conferenceId: confId,
                suppressCallbacks: true,
                moh: "music2"
            }
        });
    //console.log('Phone Connected to Conference', confId);
    inboundCallResponse = null;
}

const cancelCall = () => {
    if (!inboundCallResponse) return;

    inboundCallResponse.
        status(200).
        send({
            instructions: [
                {
                    name: 'say',
                    text: 'Call cancelled',
                    local: 'en-US'
                }
            ],
            action: {
                name: 'hangup'
            }
        });
    inboundCallResponse = null;
}

const confirmCallNotifs = (socket) => {

    socket.on('server-confirm-call-notif', (data) => {
        if (data?.status === 'ACCEPT') {
            //console.log('accepted!');
            invitePhoneAndClientToConference(data.username);
        }
        else {
            cancelCall();
            console.info(
                data.username +
                ' failed to confirm call notification'
            );
        }
    });
};

const notifyUserForCall = (data) => {
    if (!ioRef || !getActiveUsers()) return;
    let user = undefined;

    user = getActiveUsers().find((user) => {
        //console.log(user.virtualNo, data.virtualNo);
        return user.sinchVirtualNo === data.virtualNo;
    });

    if (user) {
        contact = data.remoteNumber;
        if (!contact.startsWith('+'))
            contact = '+' + contact;
        ioRef.emit('client-notify-call',
            {
                username: user.username,
                remoteNumber: data.remoteNumber
            });
        return true;
    }
    else {
        console.error('User doesn\'t exist!');
        return false;
    }
}

module.exports = {
    initCallIo,
    setInboundCallResponse,
    confirmCallNotifs,
    notifyUserForCall,
    cancelCall
};
