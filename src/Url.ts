import { IConfig } from "./types";

const buildUrl =  ({bucketName, region}: IConfig): string => {
  const countryCode = region.split("-")[0];
  if(countryCode === "cn"){
     return `https://${bucketName}.s3.${region}.amazonaws.com.${countryCode}`;
  }else if(region === "us-east-1"){
     return `https://${bucketName}.s3.${region}.amazonaws.com`;
  }else{
    return `https://${bucketName}.s3-${region}.amazonaws.com`;
  }
}

export default (config: IConfig): string => {
  if (config.s3Url && config.s3Url !== '') {
    return config.s3Url;
  }
  return buildUrl(config);
}
