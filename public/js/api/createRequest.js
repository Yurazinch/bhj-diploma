/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {url, method, responseType, data}) => {
    let xhr = new XMLHttpRequest();           
    url = options.url;    
    xhr.responseType = options.responseType;
    xhr.method = options.method;
    const formData = new FormData();    
    if(xhr.method != 'GET') {   
        for(let [key, value] in options.data) {
            formData.append( key, value );
            } 
        } else {
        let res = [];
        for(let key in options.data) {            
            res.push(`${key}=${options.data[key]}`);
        }
        url = url + '?' + res.join('&');
        console.log(url);        
    }
    xhr.open( options.method, url );
    xhr.send();

    return callback = (err, response) => {        
        xhr.onerror = () => err = Error('Ошибка соединения');
        xhr.onload = () => xhr.response = response;
    }
}
