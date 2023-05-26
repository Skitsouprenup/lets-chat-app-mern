const { getActiveUsers } = require('../socketio/activeusers.js');
const JWT = require('./jwt.js');

const sinchJWT = (req, res) => {
    const userId = req.body?.userId;

    if (!req.session?.username) {
        res.sendStatus(403);
        return;
    }
    if (!userId) {
        res.sendStatus(401);
        return;
    }

    new JWT(
        process.env.SINCH_CLIENT_APP_KEY,
        process.env.SINCH_CLIENT_APP_SECRET,
        userId).
        toJwt().
        then((key) => {

            let exists = false;
            for(const activeUser of getActiveUsers()) {
                if(activeUser.username === userId) {
                    exists = true;
                    res.status(200);
                    res.send({ 
                        key, 
                        sinchVirtualNo: activeUser?.sinchVirtualNo
                    });
                    break;
                }
            }

            if(!exists) res.sendStatus(404);
        });
};

module.exports = sinchJWT;