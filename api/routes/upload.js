/*
 * POST /upload 
 */
var config = require('./../../.env.development.js');
var _ = require('underscore')
var fs = require('fs')
var knox = require('knox')
var s3 = require('s3')

var url = 'https://s3-us-west-2.amazonaws.com/' + config.AWS.bucketName;

module.exports = function(req, res) {

    var client = knox.createClient({
        key: config.AWS.AWS_ACCESS_KEY_ID, 
        secret: config.AWS.AWS_SECRET_ACCESS_KEY,
        bucket: config.AWS.bucketName
    });
    
    var files = req.files.file;

    if(files.length === undefined) {
        var file = req.files.file;
        client.putFile(file.path, file.name, function(err, data) {
            res.send(url + file.name)
        });
    } else {
       var files = req.files.file;
       var result = [];
       for(var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log('looped');
            client.putFile(file.path, file.name, function(err, data) {
                result.push(url + file.name)
                if (result.length === files.length) {
                    res.send(result)
                }
            });
        }
    }
}
