const fetch = require('cross-fetch');

const outBoundSMS = async (req, res) => {

    const sendSMS = {
        from: process.env.SINCH_VIRTUAL_NUMBER_TRIAL,
        to: [req.body?.phoneNo],
        body: req.body?.message,
    }

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

}

module.exports =
{
    outBoundSMS,
};