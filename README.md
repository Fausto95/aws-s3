# React AWS3

ReactS3 is package for upload images to Amazon AWS S3

```
npm install --save react-s3
```
Version 1.1 - No more aws-sdk dependecies.


# Usage

```javascript
import ReactS3 from 'react-s3';

const config = {
    bucketName: 'myBucket',
    albumName: 'photos',
    region: 'eu-west-1',
    accessKeyId: 'ANEIFNENI4324N2NIEXAMPLE',
    secretAccessKey: 'cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE',
}


ReactS3.upload(file, config)
.then((data) => console.log(data))
.catch((err) => console.error(err))


  /**
   * {
   *   Response: {
   *     bucket: "your-bucket-name",
   *     key: "photos/image.jpg",
   *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
   *   }
   * }
   */
});
```

Defaults your bucket to `public-read` : http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html


1. `config`
  * `bucketName` **required** - Your S3 bucket
  * `albumName` **required** - Your S3 folderName/albumName
  * `region` **required** - Your S3 bucket's region
  * `accessKeyId` **required** - Your S3 `AccessKeyId`
  * `secretAccessKey` **required** - Your S3 `SecretAccessKey`



## License

MIT