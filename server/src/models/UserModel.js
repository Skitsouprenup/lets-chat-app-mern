const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        fullname: { type: String, required: true },
        twilioVirtualNo: { type: String, default: '' },
        sinchVirtualNo: { type: String, default: '' }
    },
    { timestamps: true }
);

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;