const { notifyUserForSMS } = require("../../socketio/sms/smsops.js");

const inBoundSMS = (req, res) => {
    //console.log(req.body);

    const phoneNo = '+' + req.body?.from;
    notifyUserForSMS({
        phoneNo,
        message: req.body?.body
    });
    res.sendStatus(200);
}

module.exports = { inBoundSMS };