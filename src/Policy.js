import { dateISOString, xAmzDate, dateYMD } from "./Date";

export default class Policy {
    static getPolicy(config) {
        const policy = () => {
            return {
                expiration: dateISOString,
                conditions: [
                    { bucket: config.bucketName },
                    [
                        "starts-with",
                        "$key",
                        `${config.dirName ? config.dirName + "/" : ""}`
                    ],
                    { acl: "public-read" },
                    ["starts-with", "$Content-Type", ""],
                    { "x-amz-meta-uuid": "14365123651274" },
                    { "x-amz-server-side-encryption": "AES256" },
                    ["starts-with", "$x-amz-meta-tag", ""],
                    {
                        "x-amz-credential": `${config.accessKeyId}/${dateYMD}/${
                            config.region
                            }/s3/aws4_request`
                    },
                    { "x-amz-algorithm": "AWS4-HMAC-SHA256" },
                    { "x-amz-date": xAmzDate }
                ]
            };
        };
        //Returns a base64 policy;
        return new Buffer(JSON.stringify(policy()))
            .toString("base64")
            .replace(/\n|\r/, "");
    };
};