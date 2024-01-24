const { TokenExpired, TokenInvaild, JWTTokenError } = require('./error');
const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const authorize = req.headers.authorization
    let token = null

    try {
        if (authorize && authorize.split(" ").length === 2) {
            token = authorize.split(" ")[1]
        }
        else {
            throw new TokenInvaild("Test", 404)
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY)

        if (decoded.exp < Date.now()) {
            throw new TokenExpired("Test", 404)
        }
        next()
    }
    catch (err) { next(err); }




}

const optionalAuth = (req, res, next) => {
    const optionalAuth = req.headers.authorization
    let token = null

    try {
        if (optionalAuth && optionalAuth.split(" ").length === 2) {
            token = optionalAuth.split(" ")[1]
        }
        else {
            optionalAuth = null
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY)

        if (decoded.exp < Date.now()) {
            decoded = undefined
        }
        next()
    }
    catch (err) { next(err); }




}

module.exports = authorize, optionalAuth;