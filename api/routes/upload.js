/*
 * POST /upload 
 */
var config = require('./../../.env.development.js');
var _ = require('underscore')
var fs = require('fs')
var knox = require('knox')

module.exports = function(req, res) {
    var file = req.files.file;
    var client = knox.createClient({
        key: config.AWS.AWS_ACCESS_KEY_ID, 
        secret: config.AWS.AWS_SECRET_ACCESS_KEY,
        bucket: config.AWS.bucketName
    });
    var headers = {
        'Content-Length': file.size,
        'Content-Type': file.type 
    };
    var stream = fs.createReadStream(file.path);
    client.putStream(stream, file.name, headers, function(err, res) {
        if (err) { console.log('error'); }
        console.log(res.statusCode);
        console.log(res.url);
    });
}
