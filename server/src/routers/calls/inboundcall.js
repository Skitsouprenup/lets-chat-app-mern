const {
    notifyUserForCall,
    setInboundCallResponse,
    cancelCall
} = require("../../socketio/calls/callsops");


const inboundCall = (req, res) => {
    //console.log(req.body);
    const eventType = req.body?.event;
    const destination = req.body?.to?.endpoint;
    const toType = req.body?.to?.type;
    //console.log(eventType, destination, toType);

    setInboundCallResponse(res);
    switch (eventType) {
        case 'ice':

            switch (toType) {
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
                    TODO: include for next refactor
                */
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

                default:
                    setInboundCallResponse(null);
                    res.sendStatus(403);
            }
            break;

        case 'ace':
            console.log('Answered Call Event');
            res.sendStatus(200);
            break;

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
            break;

        default:
            setInboundCallResponse(null);
            res.sendStatus(403);
    }
}

module.exports = inboundCall;