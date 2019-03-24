import { dateISOString, dateYMD, xAmzDate } from "./Date";
import { IConfig, Policy as PolicyType } from "./types";

export default class Policy {
  public static getPolicy(config: IConfig): string {
    const policy = (): PolicyType => {
      return {
        expiration: dateISOString,
        conditions: [
          { acl: "public-read" },
          { bucket: config.bucketName },
          ["starts-with", "$key", `${config.dirName ? config.dirName + "/" : ""}`],
          ["starts-with", "$Content-Type", ""],
          ["starts-with", "$x-amz-meta-tag", ""],
          { "x-amz-algorithm": "AWS4-HMAC-SHA256" },
          {
            "x-amz-credential": `${config.accessKeyId}/${dateYMD}/${
              config.region
            }/s3/aws4_request`
          },
          { "x-amz-date": xAmzDate },
          { "x-amz-meta-uuid": "14365123651274" },
          { "x-amz-server-side-encryption": "AES256" }
        ]
      };
    };
    //Returns a base64 policy;
    return new Buffer(JSON.stringify(policy())).toString("base64").replace(/\n|\r/, "");
  };
};
