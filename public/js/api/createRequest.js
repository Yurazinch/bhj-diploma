/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {url, data}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';    
    xhr.method = 'GET';    
    const formData = new FormData();
    let url = options.url;
    if(xhr.method != 'GET') {   
        for(let item in options.data) {
            formData.append( item );
        } 
        xhr.open( 'POST', url );
        xhr.send( formData );
        } else {
        let res = [];
        for(let key in data) {            
            res.push(`${key}=${data[key]}`);
        }
        let requestUrl = url + '?' + res.join('&');
        xhr.open( 'GET', requestUrl );
        xhr.send();
    }
    let response;
    let err;
    xhr.onload = () => response = xhr.response;
    xhr.onerror = () => err = null; 
    return (err, response);
}
