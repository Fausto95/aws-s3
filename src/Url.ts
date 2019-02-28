import { IConfig } from "./types";

const buildUrl = (config: IConfig): string => {
  const countryCode = config.region.split("-")[0]
  const bucketName = config.bucketName
  const region = config.region

  switch (countryCode) {
    case "cn":
      return `https://${bucketName}.s3.${region}.amazonaws.com.${countryCode}`;
    default:
      return `https://${bucketName}.s3-${region}.amazonaws.com`;
  }
}

export default (config: IConfig): string => {
  if (config.s3Url && config.s3Url !== '') {
    return config.s3Url;
  }

  return buildUrl(config);
}
