'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var jade = require('jade');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/dist');
app.use(express.static(path.join(__dirname, 'dist')));
app.engine('html', require('ejs').renderFile);
app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('jade', jade.__express);

app.get('/', require('./api/routes/index'))
app.post('/api/upload', multipartyMiddleware, require('./api/routes/upload'));

// Export server so it can be used with gulp
if(require.main === module) {
    app.listen(app.get('port'), function() {
        console.log('Server started @ localhost:' + app.get('port'));
    })
} else {
    module.exports === app
}
