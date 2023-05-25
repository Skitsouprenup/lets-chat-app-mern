const UserModel = require("../../models/UserModel");
const { getActiveUsers } = require("../../socketio/activeusers");

exports.setActiveUser = async (req, res) => {
    const username = req.query?.username;

    try{
        if(req.session?.username === username) {
            const user = await UserModel.findOne({
                username
            },'twilioVirtualNo sinchVirtualNo');
    
            if (!user) {
                res.sendStatus(400);
                return;
            }
    
            let exists = false;
            for(const activeUser of getActiveUsers()) {
                if(activeUser.username === username) {
                    exists = true;
                    break;
                }
            }

            if(!exists) {
                getActiveUsers().push({
                    username,
                    phoneNo: '',
                    sinchVirtualNo: user?.sinchVirtualNo,
                    twilioVirtualNo: user?.twilioVirtualNo,
                });
            }

            res.sendStatus(200);
        }
        else res.sendStatus(403);
    }
    catch(e) {
        console.error(e);
        res.sendStatus(500);
    }
};