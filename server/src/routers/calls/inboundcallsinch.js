const {
    notifyUserForCall,
    setInboundCallResponse,
    cancelCall
} = require("../../socketio/calls/callsops");

/*
    Sinch returns multiple events when an incoming
    call connects to our server.
*/
const inboundCallSinch = (req, res) => {
    //console.log(req.body);
    const eventType = req.body?.event;
    const destination = req.body?.to?.endpoint;
    const toType = req.body?.to?.type;
    //console.log(eventType, destination, toType);

    setInboundCallResponse(res);
    switch (eventType) {
        //Incoming Call Event
        case 'ice':

            switch (toType) {
                //PSTN. This type comes from an
                //inbound phone call
                case 'did':
                    if (!notifyUserForCall({
                        virtualNo: destination,
                        remoteNumber: req.body?.cli
                    })) {
                        cancelCall();
                    }
                    break;

                //Confirm app that calls for conference
                /*
                    This is not used anymore. This toType
                    can be generated if an inApp client
                    invoke callConference() function.
                    This statement let the client join
                    the conference that it's specified.

                    New implementation uses 'conferenceCallout'
                    and its confirmation is sent via trigerring 
                    'onIncomingCall' event in SinchClient
                */
                /*
                case 'conference':
                    res.status(200).
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
                                conferenceId: destination,
                                suppressCallbacks: true,
                                moh: "music2"
                            }
                        });
                    //console.log('Client Connected to Conference', destination);
                    break;
                */

                default:
                    console.log(toType + ' is invalid or not handled!');
                    setInboundCallResponse(null);
                    res.sendStatus(403);
            }
            break;

        case 'ace':
            console.log('Answered Call Event');
            res.sendStatus(200);
            break;

        //Disconnected Call Event
        case 'dice':
            setInboundCallResponse(null);
            res.sendStatus(200);
            break;

        case 'pie':
            console.log('Prompt Input Event');
            res.sendStatus(200);
            break;

        case 'notify':
            console.log('Notification Event');
            res.sendStatus(200);
            break;

        default:
            console.error('invalid event type!')
            setInboundCallResponse(null);
            res.sendStatus(403);
    }
}

module.exports = inboundCallSinch;