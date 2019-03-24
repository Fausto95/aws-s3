import shortId from 'short-uuid';
import { dateYMD, xAmzDate } from "./Date";
import { IConfig, DeleteResponse, UploadResponse } from "./types";
import { throwError } from "./ErrorThrower";
import GetUrl from "./Url";
import Policy from "./Policy";
import Signature from "./Signature";
import {fetchWithProgress} from "./utils";

class S3Client {
    private config: IConfig;
    constructor(config: IConfig) {
      this.config = config;
    }
    public async uploadFile(file: File, newFileName: string, progressCb:  ((this: XMLHttpRequest, ev: ProgressEvent) => any) ): Promise<UploadResponse> {
      throwError(this.config, file);

      const fd = new FormData();
      const fileExtension: string = file.type.split('/')[1];
      const fileName: string = `${newFileName || shortId.generate()}.${fileExtension}`;
      const key: string = `${this.config.dirName ? this.config.dirName + "/" : ""}${fileName}`;
      const url: string = GetUrl(this.config);
      fd.append("key", key);
      fd.append("acl", "public-read");
      fd.append("Content-Type", file.type);
      fd.append("x-amz-meta-uuid", "14365123651274");
      fd.append("x-amz-server-side-encryption", "AES256");
      fd.append(
          "X-Amz-Credential",
          `${this.config.accessKeyId}/${dateYMD}/${this.config.region}/s3/aws4_request`
      );
      fd.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
      fd.append("X-Amz-Date", xAmzDate);
      fd.append("x-amz-meta-tag", "");
      fd.append("Policy", Policy.getPolicy(this.config));
      fd.append(
          "X-Amz-Signature",
          Signature.getSignature(this.config, dateYMD, Policy.getPolicy(this.config))
      );
      fd.append("file", file);

      const data = await fetchWithProgress(url, { method: "post", body: fd }, progressCb);
      if (!data.ok) return Promise.reject(data);
      return Promise.resolve({
        bucket: this.config.bucketName,
        key: `${this.config.dirName ? this.config.dirName + "/" : ""}${fileName}`,
        location: `${url}/${this.config.dirName ? this.config.dirName + "/" : ""}${fileName}`,
        status: data.status
      });
    }
    public async deleteFile(fileName: string): Promise<DeleteResponse> {
      const url: string = `https://${this.config.bucketName}.s3${
        this.config.region ? "-" + this.config.region : ""
        }.amazonaws.com/${
        this.config.dirName ? this.config.dirName + "/" : ""
        }${fileName}`;

      const deleteResult = await fetch(url, { method: "delete" });
      if (!deleteResult.ok) return Promise.reject(deleteResult);
      return Promise.resolve({
        ok: deleteResult.ok,
        status: deleteResult.status,
        message: "File Deleted",
        fileName: fileName
      });
    }
}

export default S3Client;
