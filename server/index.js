const express = require('express');
const dotenv = require('dotenv');
const initConnection = require('./src/initDBConnection');
const cors = require('cors');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const UserRouter = require('./src/routers/users/userrouter.js');
const { socketOps } = require('./src/socketio/socketops');
const SMSRouter = require('./src/routers/sms/smsrouter');

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
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 200,
}));
//Need this for tranferring static files
//to client's browser
app.use(express.static('public'));

app.use('/api/users', UserRouter);
app.use('/api/sms', SMSRouter);

app.get('/*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: 'http://localhost:3000',
    methods: ['GET', 'POST'],
});
socketOps(io);

server.listen(port, () => console.log("server started at port " + port));