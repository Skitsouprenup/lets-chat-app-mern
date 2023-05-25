const { getActiveUsers } = require('../../socketio/activeusers.js');

const checkUserVirtualNo = (req, res) => {
    const username = req.query?.username;

    let userExists = false;
    for(const user of getActiveUsers()) {
        if(username === user?.username) {
            userExists = true;

            if(user?.twilioVirtualNo ||
               user?.sinchVirtualNo) {
                res.
                status(200).
                send({
                    twilioVirtualNo : user?.twilioVirtualNo ? true : false,
                    sinchVirtualNo : user?.sinchVirtualNo ? true : false
                });
            } else res.sendStatus(404);

            break;
        }
    }

    if(!userExists) {
        res.sendStatus(400);
    }
}

module.exports = { checkUserVirtualNo };