//based of the following guide: https://scoutapm.com/blog/express-error-handling

const { JsonWebTokenError } = require("jsonwebtoken");

class TokenError extends Error {
    constructor(err, statusCode) {
        super();

        if (this instanceof TokenExpired)
            this.type = 'Token expired'
        else if (this instanceof TokenInvaild)
            this.type = 'Unauthorizated'
        else if (this instanceof JWTTokenError)
            this.type = 'Unauthorizated'


        this.message = `Token vaildation failed: ${this.type}`
        this.statusCode = statusCode
    }
}

class Login extends Error {
    constructor(email, password, statusCode) {
        super();


        if (this instanceof InvaildUser)
            this.type = 'Request body incomplete, both email and password are required'
        else if (this instanceof UserNotFound)
            this.type = 'User not found'
        else if (this instanceof UserFound)
            this.type = 'User was found'
        else if (this instanceof PasswordNotFound)
            this.type = 'Password not found'


        this.message = `(username ${email}, ${password}) ${this.type}`
        this.statusCode = statusCode
    }
}

class Data extends Error {
    constructor(id, statusCode) {
        super();



        if (this instanceof InvaildParam)
            this.type = 'Invalid query parameters. Query parameters are not permitted.'
        else if (this instanceof IDNotFound)
            this.type = 'Invalid query parameters. ID parameters required.'
        else if (this instanceof VolcanoNotFound)
            this.type = 'Volcano Not Found'
        else if (this instanceof PasswordNotFound)
            this.type = 'Password not found'

        this.message = `$(id: ${id}) ${this.type}`
        this.statusCode = statusCode
    }
}

class TokenExpired extends TokenError { }
class TokenInvaild extends TokenError { }
class JWTTokenError extends TokenError { }

class InvaildUser extends Login { }
class UserNotFound extends Login { }
class PasswordNotFound extends Login { }
class UserFound extends Login { }

class InvaildParam extends Data { }
class IDNotFound extends Data { }
class VolcanoNotFound extends Data { }

module.exports = {
    TokenError,
    TokenExpired,
    TokenInvaild,
    JWTTokenError,

    Login,
    InvaildUser,
    UserNotFound,
    PasswordNotFound,
    UserFound,

    Data,
    InvaildParam,
    IDNotFound,
    VolcanoNotFound,
}
