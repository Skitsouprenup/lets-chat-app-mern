const { getActiveUsers } = require('../../socketio/activeusers.js');

const checkUserVirtualNo = (req, res) => {
    const username = req.query?.username;

    if(req.session?.username === username) {
        let userExists = false;
        for(const user of getActiveUsers()) {

            if(username === user?.username) {
                userExists = true;

                if(user?.twilioVirtualNo || user?.sinchVirtualNo) {
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
            res.sendStatus(404);
        }
    } else res.sendStatus(403);
}

module.exports = { checkUserVirtualNo };