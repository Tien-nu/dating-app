var createError = require('http-errors');
var express = require('express');
const fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/articleRouter');
var commentRouter = require('./routes/commentRouter');
var uploadRouter = require('./routes/uploadRouter');
var passport = require('passport');
require('./config/jwtConfig');

var app = express();
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const dbUrl = 'mongodb://localhost:27017/exercise20-cookies';
mongoose.connect(dbUrl)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Database connection error:', err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/imageUpload', uploadRouter);

app.route('/download')
.get(async (req, res, next) => {
    const filePath = req.query.filePath; // Get the file path from query parameter
    const safePath = path.resolve('./public/images', filePath); // Ensure the path is within the 'public/images' directory
    console.log("path" + safePath);

    // Check if the requested file is within the 'public/images' directory to prevent directory traversal attacks
    if (safePath.startsWith(path.resolve('public/images'))) {
        console.log(safePath);

        fs.exists(safePath, (exists) => {
            if (!exists) {
                return res.status(404).send({ message: "File does not exist." });
            }

            res.download(safePath, (err) => {
                if (err) {
                    console.error('Download error:', err); // Logging the error might give more details
                    return res.status(500).send({ message: "Could not download the file." });
                }
            });
        });
    } else {
        res.status(403).send({ message: "Invalid file path." });
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
