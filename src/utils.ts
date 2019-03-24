
interface ProgressResponse{
  ok: boolean,
  status: number,
  event: XMLHttpRequest,
}

/**
 * Fetch with porgress callback
 * @param url
 * @param opts
 * @param onProgress
 * @returns {Promise}
 */
export function  fetchWithProgress (url: string, opts: RequestInit, onProgress?: ((this: XMLHttpRequest, ev: ProgressEvent) => any)): Promise<Response | ProgressResponse> {

  if(onProgress){ // Backward compatibility

    return new Promise( (res, rej)=>{
      let xhr = new XMLHttpRequest();
      xhr.open(opts.method || 'get', url, true);
      xhr.onreadystatechange = function(){
        if( this.readyState === 4) {
          if( 200 <= this.status && 299 >= this.status ){
            let response ={
              ok: true,
              status: this.status,
              event: this
            };
            res(response)
          }else{
            rej({
              ok:false,
              status: this.status,
              event: this
            })
          }
        }
      };
      for (let k in opts.headers || {}) {
        //@ts-ignore
        xhr.setRequestHeader(k, opts.headers[k]);
      }
      xhr.onload = function(){
        res(this.response);
      };
      xhr.onerror = e => rej;
      if (xhr.upload && onProgress)
        xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
      xhr.send(opts.body);
    });
  }else{
    return fetch(url, opts)
  }

}

