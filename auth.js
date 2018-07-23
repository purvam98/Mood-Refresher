const jwt = require('jsonwebtoken');
const agentMan = require('./config/config.js');
const db = require("./models");


// function for verifying tokens
function verifyToken(req, res, next) {
    if (Object.keys(req.signedCookies).length === 0) {
        res.sendStatus(403)
    } else {
        let id = req.params.id
        if (req.url.includes('/users/auth/')) {
            id = req.url.slice(12, req.url.length)
        }
        const cooks = req.signedCookies.jwtAuthToken
        const token = cooks.replace(/^JWT\s/, '')
        jwt.verify(token, agentMan.secret, function (err, decoded) {
            switch (true) {
                case !decoded.hasOwnProperty('userId') || !decoded.hasOwnProperty('username'):
                    res.status(403).send('Invalid token')
                    break;
                case id !== decoded.userId:
                    res.status(403).send(decoded.userId)
                    break;
                case err:
                    res.json({ success: false, message: "Invalid token." });
                    next();
                    break;
                default:
                    db.User.findById(decoded.userId, (err, user) => {
                        // if no user, deny access
                        if (!user) return res.json({ success: false, message: "Invalid token." })
                        // otherwise, add user to req object
                        req.user = user
                        // go on to process the route:
                        next();
                    })
                    res.status(200)
            }
        })
    }
    // })
}

module.exports = {
    verifyToken
}