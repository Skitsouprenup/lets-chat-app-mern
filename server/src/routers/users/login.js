const bcrypt = require('bcrypt');
const UserModel = require('../../models/UserModel.js');

const loginUser = async (req, res) => {

    const username = req.body?.username;
    const password = req.body?.password;

    try {
        if (!username || !password) {
            res.status(400);
            res.send('Username or password is missing!');
            return;
        }

        const user = await UserModel.findOne({
            username
        }, 'username password');

        if (!user) {
            res.sendStatus(400);
            return;
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error("Password hashing error");
                console.error(err);
                res.sendStatus(500);
                return;
            }

            if (result === true) {
                // regenerate the session, which is good practice to help
                // guard against forms of session fixation
                req.session.regenerate((err) => {
                    if (err) {
                        console.error(err);
                        res.sendStatus(500);
                        return;
                    }

                    // store user information in session, typically a user id or username
                    req.session.username = user.username;

                    // save the session before redirection to ensure page
                    // load does not happen before session is saved
                    req.session.save(function (err) {
                        if (err) {
                            console.error(err);
                            res.sendStatus(500);
                            return;
                        }
                        res.status(200).send({ username: user.username });
                    })

                })
            }
            else {
                res.sendStatus(401);
            }

        });
    }
    catch (e) {
        console.error(e);
    }
}

module.exports = { loginUser };