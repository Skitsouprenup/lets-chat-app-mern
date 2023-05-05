const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const initConnection = () => {
    const uri = process.env.MONGODB_URI;
    mongoose.
        connect(uri ? uri : '').
        catch((e) => {
            console.error('Error connecting to database.');
            console.error(e);
        });
}

module.exports = initConnection;