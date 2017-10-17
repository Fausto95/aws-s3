# React AWS3

ReactS3 is package for upload images to Amazon AWS S3

```
npm install --save react-s3
```


# USAGE

```javascript
import ReactS3 from 'react-s3';

const config = {
    bucketName: '',
    albumName: '',
    accessKeyId: '',
    secretAccessKey: '',
}

ReactS3.upload(file, config)
.then((data) => console.log(data))
.catch((err) => console.error(err))
  /**
   * {
   *   postResponse: {
   *     bucket: "your-bucket",
   *     etag : "9f620878e06d28774406017480a59fd4",
   *     key: "uploads/image.png",
   *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
   *   }
   * }
   */
});
```

## License

MIT