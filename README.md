# S3Client AWS-S3

S3Client - A Javascript Library for AWS S3 File Upload

```
npm install --save aws-s3
```


# Examples Uploading An Image

## ***Uploading to S3***

```js
import S3Client from 'aws-s3';

//Optional Import
import { uploadFile } from 'aws-s3';

const config = {
    bucketName: 'myBucket',
    dirName: 'photos', /* optional */
    region: 'eu-west-1',
    accessKeyId: 'ANEIFNENI4324N2NIEXAMPLE',
    secretAccessKey: 'cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE',
}

/*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */



S3Client
    .uploadFile(file, config)
    .then(data => console.log(data))
    .catch(err => console.error(err))

//** OR *//

uploadFile(file, config)
    .then(data => console.log(data))
    .catch(err => console.error(err))

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

## ***Deleting an existing file in your bucket***

In this case the file that we want to delete is in the folder 'photos'

```js
import S3Client from 'aws-s3';

//Optional Import
import { deleteFile } from 'aws-s3';

const config = {
    bucketName: 'myBucket',
    dirName: 'school-documents',
    region: 'eu-west-1',
    accessKeyId: 'ANEIFNENI4324N2NIEXAMPLE',
    secretAccessKey: 'cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE',
}

const filename = 'hello-world.pdf'

/* If the file that you want to delete it's in your bucket's root folder, don't provide any dirName in the config object */

//In this case the file that we want to delete is in the folder 'photos' that we referred in the config object as the dirName

S3Client
    .deleteFile(filename, config)
    .then(response => console.log(response))
    .catch(err => console.error(err))

 //** OR *//

deleteFile(filename, config)
    .then(response => console.log(response))
    .catch(err => console.error(err))

  /**
   * {
   *   Response: {
   *      ok: true,
          status: 204,
          message: 'File deleted',
          fileName: 'hello-world.pdf'
   *   }
   * }
   */
});
```

## ***S3 Bucket Policy***

Doc: http://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html

```json
{
    "Version": "2012-10-17",
    "Id": "http referer policy example",
    "Statement": [
        {
            "Sid": "Allow all kind of http requests originating from http://www.your-website.com and https://www.your-website.com",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:GetObjectAcl",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::myBucket/*",
            "Condition": {
                "StringLike": {
                    "aws:Referer": [
                        "https://www.your-website.com",
                        "http://www.your-website.com"
                    ]
                }
            }
        }
    ]
}
```


Defaults your bucket to `public-read` : http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html


1. `config`
  * `bucketName` **required** - Your S3 bucket
  * `dirName` **required** - Your S3 folderName/dirName
  * `region` **required** - Your S3 bucket's region
  * `accessKeyId` **required** - Your S3 `AccessKeyId`
  * `secretAccessKey` **required** - Your S3 `SecretAccessKey`


***Versions History***

__Version 1.5.6__ - Support for Aws-China - #30 #32

__Version 1.5.5__ - CRA Bug Fix

__Version 1.5.0__ - Bug fix & ES5 transpilation

__Version 1.4.0__ - Renamed Project

__Version 1.3.0__ - Support for any type of file

__Version 1.2.2__ - Album bug fix plus async + await

__Version 1.2__ - Now supports delete method.

__Version 1.1__ - No more aws-sdk dependecies.


## License

MIT
