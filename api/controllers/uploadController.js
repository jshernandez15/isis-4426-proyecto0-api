const IncomingForm = require('formidable').IncomingForm;

module.exports = function upload(req, res) {
    var form = new IncomingForm();
    var response = {};

    form.keepExtensions = true;

    form.on('file', (field, file) => {
        response = file;
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path
        //res.end(util.inspect({ fields: field, files: file }));
    });
    form.on('end', () => {
        res.json(response);
    });
    form.parse(req);
};