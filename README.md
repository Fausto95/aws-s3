# React AWS3

ReactS3 is package for upload images to Amazon AWS S3

```
npm install --save react-s3
```


# Examples

## ***Uploading to S3***
```javascript
import ReactS3 from 'react-s3';

const config = {
    bucketName: 'myBucket',
    albumName: 'photos',
    region: 'eu-west-1',
    accessKeyId: 'ANEIFNENI4324N2NIEXAMPLE',
    secretAccessKey: 'cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE',
}

/*  Notice that if you don't provide an albumName, the file will be automatically uploaded to the root of your bucket */



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

## ***Deleting an existing file in your bucket***

In this case the file that we want to delete is in the folder 'photos'

```javascript
import ReactS3 from 'react-s3';

const config = {
    bucketName: 'myBucket',
    albumName: 'photos',
    region: 'eu-west-1',
    accessKeyId: 'ANEIFNENI4324N2NIEXAMPLE',
    secretAccessKey: 'cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE',
}

const filename = 'my-image.png'

/* If the file that you want to delete it's in the your bucket's root folder, don't provide any albumName in the config object*/

//In this case the file that we want to delete is in the folder 'photos' that we referred in the config object as the albumName

ReactS3.delete(filename, config)
.then((response) => console.log(response))
.catch((err) => console.error(err))


  /**
   * {
   *   Response: {
   *      ok: true,
          status: 204,
          message: 'File deleted',
          fileName: 'my-image.png'
   *   }
   * }
   */
});
```

## ***S3 Bucket Policy***

Doc: http://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html

```
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
  * `albumName` **required** - Your S3 folderName/albumName
  * `region` **required** - Your S3 bucket's region
  * `accessKeyId` **required** - Your S3 `AccessKeyId`
  * `secretAccessKey` **required** - Your S3 `SecretAccessKey`


***Versions History***

`Version 1.2.2`- Album bug fix plus async + await

`Version 1.2` - Now supports delete method.

`Version 1.1` - No more aws-sdk dependecies.


## License

MIT