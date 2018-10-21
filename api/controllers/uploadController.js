const IncomingForm = require('formidable').IncomingForm;
var AWS = require("aws-sdk");
var fs = require('fs');


module.exports = function upload(req, res) {

    let s3bucket = new AWS.S3({
        accessKeyId: process.env.KEYID,
        secretAccessKey: process.env.SECRETKEYID,
    });
    AWS.config.region = "us-west-2"; //us-west-2 is Oregon

    var form = new IncomingForm();
    var response = {};

    form.keepExtensions = true;
    //form.uploadDir = "/mnt/fileServer";

    form.on('file', (field, file) => {
        response = file;
        fs.readFile(response.path, function (err, data) {
            if (err) { throw err; }
            params = { Bucket: "4426-grupo1-videos/original", Key: response.name, Body: data };
            s3bucket.upload(params, function (err, data) {
                if (err) {
                    console.log('error in callback');
                }
                console.log('success');
            });
        }); 

    });
    form.on('end', () => {
        res.json(response);
    });
    form.parse(req);
};