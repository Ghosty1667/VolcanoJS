var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const fs = require('fs');
require('dotenv').config();


var indexRouter = require('./routes/old/index');
var usersRouter = require('./routes/old/users');
var apiRouter = require('./routes/old/api');

var countryRouter = require('./routes/data/countries')
var volcanoesRouter = require('./routes/data/volcanoes')
var volcanoRouter = require('./routes/data/volcano')

var userRouter = require('./routes/data/user')

var meRouter = require('./routes/data/me')

const { errorLogger, errorResponder } = require('./routes/data/handling')
const { authorize } = require('./routes/data/authorization');

var app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = require('./knexfile.js');

const knex = require('knex')(options);
app.use((req, res, next) => {
  req.db = knex
  next()
});


logger.token('req', (req, res) => JSON.stringify(req.headers))
logger.token('res', (req, res) => {
  const headers = {}
  res.getHeaderNames().map(h => headers[h] = res.getHeader(h))
  return JSON.stringify(headers)
})



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', indexRouter);
app.use('/api', apiRouter);


app.use('/countries', countryRouter);
app.use('/volcano', volcanoRouter);
app.use('/volcanoes', volcanoesRouter);
app.use('/user', userRouter);
app.use('/me', meRouter)

app.use(errorLogger)
app.use(errorResponder)

app.use(logger('common', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));
app.use(logger('dev'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json("Page Not Found")
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
