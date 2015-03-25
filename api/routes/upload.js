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
    
    var files = req.files.file;

    console.log(files);

    if(files.length === undefined) {
        var file = req.files.file;
        client.putFile(file.path, file.name, function(err, data) {
            if(err) {
                console.log(err);
            }
            res.send([url + file.name])
        });

        fs.unlink(file.path, function (err) {
          if (err) throw err;
          console.log('successfully deleted ' + file.path);
        });

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

            var req = client.putStream(stream, file.name, headers, function(err, result){
                if (err) throw err;
            });

            req.on('progress', function(data) {
                console.log('File:' + data.percent + '%');
            })

            req.on('response', function(data) {
                result.push(req.url)
                console.log(req.url);

                fs.unlink(file.path, function (err) {
                  if (err) throw err;
                  console.log('successfully deleted ' + file.path);
                });

                if(result.length === files.length) {
                    res.send(result);
                }
            })

        })
    }
}
