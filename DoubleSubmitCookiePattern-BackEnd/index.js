const express = require('express')
let cors = require('cors')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
const uuid = require('uuid/v4')
const session = require('express-session')
let time = require('express-timestamp')

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(time.init);

let user = {username: '', sessionId: '', token: ''};

app.use(session({
    genid: (req) => {
      return uuid()
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

/**
 * login
 */
app.post('/login', (req, res) => {
    if(req.body.username == "admin" && req.body.password == "admin") {
        user = {
            username: req.body.username,
            sessionId: req.sessionID
        }
        res.send({sessionId: user.sessionId, csrftoken: req.sessionID + req.timestamp});
    }
});

/**
 * transferring csrf token from front end
 */
app.post('/transferToken', (req, res) => {
    if(req.headers.sid == user.sessionId) {
        if(req.body.token == req.headers.csrf) {
            res.send({result: 'Transferring Successful'});
        }
        else {
            res.send({result: 'Invalid Token'});
        }
    }
    else {
        res.send({result: 'Invalid Cookie'});
    }
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));