/*
 * POST /upload 
 */
var AWS = require('aws-sdk')
var _ = require('underscore')
var flow = require('flow')
var fs = require('fs')

AWS.config.update({
	accessKeyId: '', 
	secretAccessKey: ''
});


var s3 = new AWS.S3()


module.exports = function(req, res) {
    // We are able to access req.files.file thanks to 
    // the multiparty middleware
    // console.log('something happened!')
    // var file = req.files.file;
    // console.log(file);
    // console.log(file.type);


// Create a bucket and upload something into it
// var bucketName = 'clintonbucket';
var file = req.files.file;

console.log(file)
console.log(file.name)

var params = {Bucket: 'clintonbucket', Key: file.name};
var file = require('fs').createWriteStream(file.path);

s3.getObject(params).
on('httpData', function(chunk) { file.write(chunk); }).
on('httpDone', function() { file.end(); }).
send();



	// s3.listBuckets(function(err, data) {
	//   if (err) { console.log("Error:", err); }
	//   else {
	//     for (var index in data.Buckets) {
	//       var bucket = data.Buckets[index];
	//       console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
	//     }
	//   }
	// });









	// files = _.toArray(req.files),
	//      uploadNumber = files.length,
	//      result = {
	//         error : 0,
	//         uploaded : []
	//      };

	//  _.each(files, function(file) {
	//      flow.exec(
	//      function() { // Read temp File
	//          console.log(fs.readFile(file.path, this));
	//      }, function(err, data) { // Upload file to S3
	//          s3.putObject({
	//              Bucket: 'clintonbucket', //Bucket Name
	//              Key: file.name, //Upload File Name, Default the original name
	//              Body: data
	//          }, this);
	//      }, function(err, data) { //Upload Callback
	//          if(err) {
	//              console.dir('Error : ' + err);
	//              result.error++;
	//          }
	//          console.log('Woot')
	//          result.uploaded.push(data.ETag);
	//          this();
	//      }, function() {
	//          if(--uploadNumber === 0) {
	//              res.render("result", {
	//                  title: "Upload Result",
	//                  message: result.error > 0 ? "Something is wroing, Check the log" : "Success!!",
	//                  entitiyIDs : result.uploaded
	//              });

	//              console.log('Nope')
	//          }
	//      });
	//  });
}
