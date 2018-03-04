import { dateISOString, xAmzDate, dateYMD } from './Date'

export default class Policy {  
    static getPolicy(config){
        const policy = (keys, date, dateISO) =>  {
            return ({'expiration': dateISO,
            "conditions": [
                {"bucket": keys.bucketName},
                ["starts-with", "$key", `${keys.albumName ? keys.albumName + '/' : ''}`],
                {"acl": "public-read"},
                ["starts-with", "$Content-Type", "image/"],
                {"x-amz-meta-uuid": "14365123651274"},
                {"x-amz-server-side-encryption": "AES256"},
                ["starts-with", "$x-amz-meta-tag", ""],
                {"x-amz-credential": `${keys.accessKeyId}/${dateYMD}/${keys.region}/s3/aws4_request`},
                {"x-amz-algorithm": "AWS4-HMAC-SHA256"},
                {"x-amz-date":  xAmzDate}
            ]
            })
        }
        const policyBase64 = new Buffer(JSON.stringify(policy(config, xAmzDate, dateISOString, dateYMD))).toString('base64').replace(/\n|\r/, '');
        return policyBase64
    }
}