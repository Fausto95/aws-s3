
export default (countryCode: string, bucketName: string, region: string): string => {
  switch(countryCode) {
    case "cn":
      return `https://${bucketName}.s3.${region}.amazonaws.com.${countryCode}`;
    default:
      return `https://${bucketName}.s3-${region}.amazonaws.com`;
  }
}
