export const throwError = (
    { bucketName, region, accessKeyId, secretAccessKey, albumName },
    file, fileName
) => {
    if (bucketName === null || bucketName === "")
        throw new Error(`Your bucketName cannot be empty `);
    if (region === null || region === "")
        throw new Error(`Must provide a valide region in order to use your bucket`);
    if (accessKeyId === null || accessKeyId === "")
        throw new Error(`Must provide accessKeyId`);
    if (secretAccessKey === null || secretAccessKey === "")
        throw new Error(`Must provide secretAccessKey`);
    if (!file)
        throw new Error(`File cannot be empty`);
    if (!fileName)
        throw new Error(`Must provide a filename in order to delete anything in your bucket`);
};
  