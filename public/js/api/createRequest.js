/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = { url, responseType, method, data }, cbResp ) => {
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
    xhr.send(formData);

    cbResp = () => {
        xhr.onload = () => {
            if(xhr.status === 200 ) {
                response = xhr.response;
                console.log(response);
            }
        }
        xhr.onerror = () => {
            err = new Error('Ошибка запроса');
        }
        return response, err;        
    }    
    
    

}
