const { notifyUserForSMS } = require("../../../socketio/sms/smsops.js");

const sinchInboundSMS = (req, res) => {
    //console.log(req.body);

    let phoneNo = req.body?.from;
    phoneNo = 
        phoneNo.startsWith('+') ? phoneNo : 
        '+' + phoneNo; 
    notifyUserForSMS({
        phoneNo,
        message: req.body?.body
    });
    res.sendStatus(200);
}

module.exports = { sinchInboundSMS };