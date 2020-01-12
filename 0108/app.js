const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.text({type: '*/*'}));

const xssDetecter = (req, res, next) => {
    console.log(req.body);
    if(req.body.includes('<script>')){
        res.status(400).send('XSS Detected!');
    } else {
        next();
    }
};

app.post('/', xssDetecter);
app.use('/', indexRouter);

module.exports = app;
