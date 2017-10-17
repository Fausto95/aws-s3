const AWS = require('aws-sdk');

class ReactS3 {
    static upload(file, config) {
        const s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            credentials: {
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            }
        });

        s3.listBuckets((err, data) => {
            console.log(err, data);
        });
        const fileName = file.name;
        const albumPhotosKey = encodeURIComponent(config.albumName) + '/';
        const photoKey = albumPhotosKey + fileName;
        return new Promise((resolve, reject) => {
            s3.upload({
                Key: photoKey,
                Body: file,
                ACL: 'public-read',
                Bucket: config.bucketName
            }, function (err, data) {
                if (err) {
                    return reject(err)
                }
                return resolve(data)
            });
        })
    }
}

export default ReactS3