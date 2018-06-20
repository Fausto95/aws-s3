export const throwError = function ( _ref, file) {
    var bucketName = _ref.bucketName,
       region = _ref.region,
       accessKeyId = _ref.accessKeyId,
       secretAccessKey = _ref.secretAccessKey,
       albumName = _ref.albumName;

    if (bucketName === null || bucketName === "") throw new Error("Your bucketName cannot be empty ");
    if (region === null || region === "") throw new Error("Must provide a valide region in order to use your bucket");
    if (accessKeyId === null || accessKeyId === "") throw new Error("Must provide accessKeyId");
    if (secretAccessKey === null || secretAccessKey === "") throw new Error("Must provide secretAccessKey");
    if (!file) throw new Error("File cannot be empty");
};
