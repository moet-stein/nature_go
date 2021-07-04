const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');
const FileType = require('file-type');
const multiparty = require('multiparty');
require('dotenv').config();

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };

  return s3.upload(params).promise();
  // return s3.upload(params, function (err, data) {
  //   if (err) {
  //     console.log(err);
  //     throw err;
  //   }
  //   console.log(`File uploaded successfully. ${data.Location}`);
  //   // return data.Location;
  // });
};
// Define POST route
router.post('/upload', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {
      console.log('this is error for uploading pic', error);
      return res.status(500).send(error);
    }
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = await FileType.fromBuffer(buffer);
      const fileName = `bucketFolder/${Date.now().toString()}`;
      const data = await uploadFile(buffer, fileName, type);
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
