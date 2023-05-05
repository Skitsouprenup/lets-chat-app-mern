const bcrypt = require('bcrypt');
const UserModel = require('../../models/UserModel.js');

const registerUser = (req, res) => {

    const username = req.body?.username;
    const password = req.body?.password;
    const email = req.body?.email;
    const fullname = req.body?.fullname;

    if (!username && !password && !email && !fullname) {
        res.sendStatus(400);
        return;
    }

    //Generate salt, hash password with salt and save user credentials
    //to database
    bcrypt.genSalt(Number(process.env.PASSWORD_SALT_ROUNDS), (err, salt) => {
        if (err) {
            console.error("Salt Generation Error");
            console.error(err);
            res.sendStatus(500);
            return;
        }

        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.error("Password hashing error");
                console.error(err);
                res.sendStatus(500);
                return;
            }

            try {
                const newUser = new UserModel({
                    username,
                    password: hash,
                    email,
                    fullname
                });
                newUser.isNew = true;
                const savedUser = await newUser.save();

                if (savedUser) res.sendStatus(201);
                else res.sendStatus(500);
            } catch (e) {
                console.error(e);
            }
        });
    })

}

module.exports = { registerUser };