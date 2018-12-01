/**
 * Fetch function with on progress cb
 * @param url
 * @param opts
 * @param onProgress
 * @returns {Promise}
 */
export function  fetchWithProgress (url, opts={}, onProgress) {
    return new Promise( (res, rej)=>{
        let xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for (let k in opts.headers||{})
            xhr.setRequestHeader(k, opts.headers[k]);
        xhr.onload = e => res(e.target.responseText);
        xhr.onerror = rej;
        if (xhr.upload && onProgress)
            xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
        xhr.send(opts.body);
    });
}
