const { notifyUserForSMS } = require('../../../socketio/sms/smsops');

exports.twilioInboundSMS = (req, res) => {
    console.log(req.body);

    let phoneNo = req.body?.From;
    phoneNo = 
        phoneNo.startsWith('+') ? phoneNo : 
        '+' + phoneNo; 
    notifyUserForSMS({
        phoneNo,
        message: req.body?.Body
    });
    res.sendStatus(200);
}