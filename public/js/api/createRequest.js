/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = { url, responseType, method, data }, callback ) => {
    let xhr = new XMLHttpRequest();
    url = options.url;
    xhr.responseType = options.responseType;
    xhr.method = options.method;    
    const formData = new FormData(); 
    console.log(options.data)   
    if(xhr.method != 'GET') {   
        for(let key in options.data) {
            formData.append( key, options.data[key] );
            console.log(formData);
            } 
        } else {
        let res = [];
        for(let key in options.data) {            
            res.push(`${key}='${options.data[key]}'`);
        }
        url = url + '?' + res.join('&'); 
        console.log(url);           
    }
    xhr.open( options.method, url );
    
    xhr.onload = () => {                // обработка ответа сервера
        if(xhr.status === 200 ) {
            response = xhr.response;
            callback(null, response);
        } else {
            err = response.statusText;
            callback(err, null);
        }
    }
    
    xhr.onerror = (e) => {              // обработка ошибок сети
        err = e.type
        callback(err, null);
    }    
    
    xhr.send(formData);
} 