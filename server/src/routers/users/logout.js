const { removeActiveUser } = require("../../socketio/activeusers");

const logOutUser = (req, res) => {

    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.username = null
    req.session.save(function (err) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) {
                console.error(err);
                res.sendStatus(500);
                return;
            }
            removeActiveUser(req.query?.username);
            res.sendStatus(200);
        })
    })
}

module.exports = { logOutUser };