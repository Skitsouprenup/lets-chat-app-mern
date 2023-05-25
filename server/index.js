const express = require('express');
const dotenv = require('dotenv');
const initConnection = require('./src/initDBConnection');
const cors = require('cors');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const UserRouter = require('./src/routers/users/userrouter');
const { socketOps } = require('./src/socketio/socketops');
const SMSRouter = require('./src/routers/sms/smsrouter');
const { getHostDomain } = require('./utilities');
const CallsRouter = require('./src/routers/calls/callsrouter');
const sinchJWT = require('./src/sinch/sinchjwt');
const twilioJWT = require('./src/twilio/twiliojwt');

dotenv.config();
const app = express();

initConnection();

const port = process.env.PORT || 4000;

app.use(express.json({ type: 'application/json' }),
    express.text({ type: 'text/plain' }),
    express.urlencoded({
        extended: true
    }));

//1 day
const exprTime = 1000 * 60 * 60 * 24;
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: exprTime },
    resave: false
}));

app.use(cors({
    origin: getHostDomain(),
    methods: 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    credentials: true,
    optionsSuccessStatus: 200,
}));
//Need this for tranferring static files
//to client's browser
app.use(express.static('public'));

app.use('/api/users', UserRouter);
app.use('/api/sms', SMSRouter);
app.use('/api/calls', CallsRouter);

app.post('/api/sinchjwt', sinchJWT);
app.post('/api/twiliojwt', twilioJWT);

app.get('/*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: getHostDomain(),
    methods: ['GET', 'POST'],
});
socketOps(io);

server.listen(port, () => console.log("server started at port " + port));