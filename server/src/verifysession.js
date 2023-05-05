const verifySession = (req, res) => {

    if (req.session?.username)
        res.status(200).send({ username: req.session.username });
    else res.status(200).send({ username: '' });
}
module.exports = verifySession;