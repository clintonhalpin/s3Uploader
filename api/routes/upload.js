/*
 * POST /upload 
 */

var config = require('./../../.env.development.js');
var _ = require('underscore')
var fs = require('fs')
var knox = require('knox')
var s3 = require('s3')

var url = 'https://s3-us-west-2.amazonaws.com/' + config.AWS.bucketName + '/';

module.exports = function(req, res) {

    var client = knox.createClient({
        key: config.AWS.AWS_ACCESS_KEY_ID, 
        secret: config.AWS.AWS_SECRET_ACCESS_KEY,
        bucket: config.AWS.bucketName
    });

    function replaceSpace(name) {
        return name.replace(/ /g, '_');
    }

    function deleteFile(file) {
        fs.unlink(file.path, function (err) {
            if (err) throw err;
            console.log('successfully deleted ' + file.path);
        });
    }

    var files = req.files.file;


    if(files.length === undefined) {
        var file = req.files.file;
        var stream = fs.createReadStream(file.path);
        var headers = {
            'Content-Length': file.size,
            'Content-Type': file.type 
        };

        var req = client.putStream(stream, replaceSpace(file.name), headers, function(err, result){
            if (err) throw err;
        });

        req.on('progress', function(data) {
            console.log('File:' + data.percent + '%');
        })

        req.on('response', function(data) {
            res.send([req.url]);
            deleteFile(file);
        })

    } else {
        var files = req.files.file;
        var result = [];

        files.forEach(function(item) {
            var file = item;
            var stream = fs.createReadStream(file.path);

            var headers = {
                'Content-Length': file.size,
                'Content-Type': file.type 
            };

            var req = client.putStream(stream, replaceSpace(file.name), headers, function(err, result){
                if (err) throw err;
            });

            req.on('progress', function(data) {
                console.log('File:' + data.percent + '%');
            })

            req.on('response', function(data) {
                result.push(req.url)
                console.log(req.url);
                deleteFile(file);

                if(result.length === files.length) {
                    res.send(result);
                }
            })

        })
    }
}
