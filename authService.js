const jwt = require('jsonwebtoken');
const agentMan = require('./config/config.js');
const db = require("./models");


// function for verifying tokens
function verifyToken(req) {
    return new Promise(function (resolve, reject) {
        console.log(req.signedCookies)
        let result = {
            decoded: '',
            success: true
        }
            // if (req.url.includes('/users/auth/')) {
            //     id = req.url.slice(12, req.url.length)
            // }
            const cooks = req.signedCookies.jwtAuthToken
            const token = cooks.replace(/^JWT\s/, '')
            jwt.verify(token, agentMan.secret, function (err, decoded) {
                switch (true) {
                    case !decoded.hasOwnProperty('userId') || !decoded.hasOwnProperty('username'):
                        result.success = false
                        break;
                    case err:
                        result.success = false
                        break;
                    default:
                        db.User.findById(decoded.userId, (err, user) => {
                            // if no user, deny access
                            result.decoded = decoded
                            if (!user) result.success = false
                            // otherwise, add user to req object
                            req.user = user
                            resolve(result)
                            // go on to process the route:
                        })
                }
            })
        
    })
}

module.exports = {
    verifyToken
}