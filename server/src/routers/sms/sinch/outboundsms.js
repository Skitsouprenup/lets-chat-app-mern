const fetch = require('cross-fetch');
const { getVirtualNo } = require('../../../../utilities');

const sinchOutboundSMS = async (req, res) => {
    const username = req.body?.username;

    if(req.session?.username === username) {
        if(!username) {
            res.sendStatus(401);
            return;
        }
    
        const virtualNo = getVirtualNo('Sinch', username);
        if(!virtualNo) {
            res.sendStatus(404);
            return;
        }
    
        const sendSMS = {
            from: virtualNo,
            to: [req.body?.phoneNo],
            body: req.body?.message,
        }
        
        try {
            let result = await fetch(
                'https://us.sms.api.sinch.com/xms/v1/' + process.env.SINCH_SERVICE_PLAN_ID + '/batches',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + process.env.SINCH_API_TOKEN,
                    },
                    body: JSON.stringify(sendSMS),
                }
            );
        
            const data = await result.json();
            if (data) {
                console.info(data);
                res.sendStatus(200);
            }
            else {
                console.error('Empty fetch.');
                res.sendStatus(500);
            }
        } catch(e) { 
            console.error(e); 
            res.sendStatus(500);
        }
    } else res.sendStatus(403);

}

module.exports =
{
    sinchOutboundSMS,
};