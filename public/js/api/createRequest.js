/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {url, method, responseType, data}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = options.responseType;    
    xhr.method = options.method;
    url = options.url;
    const formData = new FormData();    
    if(xhr.method != 'GET') {   
        for(let [key, value] in options.data) {
            formData.append( key, value );
        } 
        xhr.open( 'POST', url );
        xhr.send( formData );
        } else {
        let res = [];
        for(let key in options.data) {            
            res.push(`${key}=${options.data[key]}`);
        }
        let requestUrl = url + '?' + res.join('&');
        console.log(requestUrl);
        xhr.open( 'GET', requestUrl );
        xhr.send();
    }
    
    return (err, response) => {
        xhr.onload = () => response = xhr.response;
        xhr.onerror = () => err = Error("Запрос не удался");
    };
}
