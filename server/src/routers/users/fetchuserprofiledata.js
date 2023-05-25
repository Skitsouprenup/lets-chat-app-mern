const UserModel = require("../../models/UserModel");


exports.fetchUserProfileData = async (req, res) => {
    const username = req.query?.username;

    if(req.session?.username === username) {

        const user = await UserModel.findOne({
            username
        },'twilioVirtualNo sinchVirtualNo email fullname');

        if (!user) {
            res.sendStatus(404);
            return;
        }

        res.status(200).send({
            fullname: user?.fullname,
            email: user?.email,
            twilioVirtualNo: user?.twilioVirtualNo,
            sinchVirtualNo: user?.sinchVirtualNo,
        });
    }
}