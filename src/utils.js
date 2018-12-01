/**
 * Fetch with porgress callback
 * @param url
 * @param opts
 * @param onProgress
 * @returns {Promise}
 */
export function  fetchWithProgress (url, opts={}, onProgress) {
  return new Promise( (res, rej)=>{
    debugger;
    let xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url, true);
    xhr.onreadystatechange = (e) => {
      if(e.currentTarget.readyState === 4) {
        if( 200 <= e.currentTarget.status && 299 >= e.currentTarget.status ){
          let response ={
            ok: true,
            event: xhr
          };
          res(response)
        }else{
          rej({ok:false, event: xhr})
        }
      }
    };
    for (let k in opts.headers||{})
      xhr.setRequestHeader(k, opts.headers[k]);
    xhr.onload = e => res(e.target.responseText);
    xhr.onerror = e => rej;
    if (xhr.upload && onProgress)
      xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    xhr.send(opts.body);
  });
}

