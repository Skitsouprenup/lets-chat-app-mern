const { activeUsersEvents } = require("./activeusers.js");
const { joinRoom } = require("./roomevents.js");
const { initSMSIo, confirmSMSNotifs } = require("./sms/smsops.js");
const { webRTCSocketServerEvents } = require("./webrtc/signaling.js");
const { initCallIo, confirmCallNotifs } = require("./calls/callsops.js");

const socketOps = (io) => {

    initSMSIo(io);
    initCallIo(io);
    io.on('connection', (socket) => {

        activeUsersEvents(socket);
        joinRoom(io, socket);
        webRTCSocketServerEvents(socket);
        confirmSMSNotifs(socket);
        confirmCallNotifs(socket);
    });
}

module.exports = { socketOps };