import Signature from './Signature'
import Policy from './Policy'
import {
    dateISOString,
    xAmzDate,
    dateYMD
} from './Date'

class ReactS3 {
    static upload(file, config) {
        const fd = new FormData();
        const key = `${config.albumName ? config.albumName + '/' : ''}${file.name}`;
        const url = `https://${config.bucketName}.s3.amazonaws.com/`
        fd.append('key', key);
        fd.append('acl', 'public-read');
        fd.append('Content-Type', file.type);
        fd.append('x-amz-meta-uuid', '14365123651274');
        fd.append('x-amz-server-side-encryption', 'AES256')
        fd.append('X-Amz-Credential', `${config.accessKeyId}/${dateYMD}/${config.region}/s3/aws4_request`);
        fd.append('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
        fd.append('X-Amz-Date', xAmzDate)
        fd.append('x-amz-meta-tag', '');
        fd.append('Policy', Policy.getPolicy(config))
        fd.append('X-Amz-Signature', Signature.getSignature(config, dateYMD, Policy.getPolicy(config)));
        fd.append("file", file);
        return new Promise(async(resolve, reject) => {
            const errorHandler = fn => {
                return fn.then(data => [null, data])
                    .catch(err => [err])
            }
            const uploadResult = async() => {
                let err, result;
                [err, result] = await errorHandler(fetch(url, {
                    method: 'post',
                    headers: {
                        fd
                    },
                    body: fd
                }))
                if (err) reject(err)
                resolve({
                    bucket: config.bucketName,
                    key: `${config.albumName ? config.albumName + '/' : ''}${file.name}`,
                    location: `${url}${config.albumName ? config.albumName +'/' : ''}${file.name}`,
                    result: result
                })
            }
            uploadResult()
        })
    }
    static delete(fileName, config) {
        const fd = new FormData();
        const url = `https://${config.bucketName}.s3-${config.region}.amazonaws.com/${config.albumName ? config.albumName + '/' : ''}${fileName}`
        fd.append('Date', xAmzDate)
        fd.append('X-Amz-Date', xAmzDate);
        fd.append('Authorization', Signature.getSignature(config, dateYMD, Policy.getPolicy(config)));
        fd.append('Content-Type', 'text/plain')
        return new Promise(async(resolve, reject) => {
            const errorHandler = fn => {
                return fn.then(data => [null, data])
                    .catch(err => [err])
            }
            const deleteResult = async() => {
                let err, result;
                [err, result] = await errorHandler(fetch(url, {
                    method: 'delete',
                    headers: {
                        fd
                    }
                }))
                if (err) reject(err)
                resolve({
                    ok: result.ok,
                    status: result.status,
                    message: 'File Deleted',
                    fileName: fileName
                })
            }
            deleteResult()
        })
    }
}
export default ReactS3