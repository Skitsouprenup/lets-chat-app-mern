const UserModel = require("../../models/UserModel");
const { updateActiveUserVirtualNosInServer } = require("../../socketio/activeusers");

const saveProfile = async (req, res) => {

    const username = req.body?.username;
    const email = req.body?.email;
    const twilioVirtualNo = req.body?.twilioVirtualNo;
    const sinchVirtualNo = req.body?.sinchVirtualNo;

    if(req.session?.username === username) {
        try{
            const user = await UserModel.findOne({
                username
            }, 'email twilioVirtualNo sinchVirtualNo');
        
            if (!user) {
                res.sendStatus(404);
                return;
            }
            
            const allUsers = await UserModel.find(
                {}, 
                'username email twilioVirtualNo sinchVirtualNo');

            //Verify if email, twilio and sinch virtual numbers 
            //are already taken by a user.
            let importCredentialsExist = false;
            let message = '';
            for(let i = 0; i < allUsers.length; i++) {
                if(allUsers[i].username !== username) {
                    if(allUsers[i].email === email) {
                        importCredentialsExist = true;
                        message = 'E-mail already taken.';
                        break;
                    }
                    if(allUsers[i].twilioVirtualNo === twilioVirtualNo) {
                        importCredentialsExist = true;
                        message = 'Twilio virtual number already taken.';
                        break;
                    }
                    if(allUsers[i].sinchVirtualNo === sinchVirtualNo) {
                        importCredentialsExist = true;
                        message = 'Sinch virtual number already taken.';
                        break;
                    }
                }
                if(importCredentialsExist) break;
            }

            if(!importCredentialsExist) {
                user.email = email;
                user.twilioVirtualNo = twilioVirtualNo;
                user.sinchVirtualNo = sinchVirtualNo;
                user.isNew = false;
            
                await user.save();
                updateActiveUserVirtualNosInServer(
                    username, 
                    twilioVirtualNo, 
                    sinchVirtualNo
                );
                res.sendStatus(201);
            } else res.status(200).send(message);
        }
        catch(e) {
            console.error(e);
            res.sendStatus(500);
        }
    } else res.sendStatus(403);

};

module.exports = { saveProfile };