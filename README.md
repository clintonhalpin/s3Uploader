# s3Uploader  
A simple example of how to upload files to [Amazon S3](http://aws.amazon.com/s3/) with Node, Express, and Angular. This project is not something you will be immediatley able to integrate but rather an example of how to do it.

### Configuring S3 

In order to use this project you need to add your **AWS_ACCESS_KEY_ID**, **AWS_SECRET_ACCESS_KEY**, and a **bucketName** that you'll be uploading to.
You can add your credentials in:

.env.development.js

```javascript
module.exports = {                                                                                                            
    AWS: {
        AWS_ACCESS_KEY_ID: "Your access key",
        AWS_SECRET_ACCESS_KEY: "Your secret key",
        bucketName: "Your bucket name"
    }
}
```

Links: 
* [Creating Access credentials](http://docs.aws.amazon.com/IAM/latest/UserGuide/ManagingCredentials.html#Using_CreateAccessKey)
* [Creating a bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)

### Getting started

Install all project dependencies

```shell
# Install depenendencies
npm start

# Build front-end ( default: dist/ )
gulp dist

# Run Livereload & Node Server
gulp
```

### Built Using

* [Knox](http://github.com/learnboost/knox)
* [Express](http://expressjs.com)
* [Connect Multiparty](https://github.com/andrewrk/connect-multiparty)

### License
[MIT license](http://opensource.org/licenses/MIT)

***
Built with <3 by [@clintonhalpin](http://twitter.com/clintonhalpin) 
