
export default (countryCode: string, bucketName: string, region: string): string => {
  if(countryCode === "cn"){
     return `https://${bucketName}.s3.${region}.amazonaws.com.${countryCode}`;
  }else if(region === "us-east-1"){
     return `https://${bucketName}.s3.${region}.amazonaws.com`;
  }else{
    return `https://${bucketName}.s3-${region}.amazonaws.com`;
  }
}
