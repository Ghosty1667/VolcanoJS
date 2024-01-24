const errorLogger = (err, req, res, next) => {
    console.error('\x1b[31m', err)
    next(err)
}

const errorResponder = (err, req, res, next) => {
    console.log(err)
    error = { error: true, message: err.message }
    res.header("Content-Type", 'application/json')
    res.status(err.statusCode).send(JSON.stringify(error))
}

module.exports = { errorLogger, errorResponder }