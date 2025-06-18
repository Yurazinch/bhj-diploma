/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json'; 
    const formData = new FormData();
    console.log(options.data);
    let url = options.url;
    if(options.method != 'GET') {   
        for(let key in options.data) {
            formData.append( [key], options.data[key] );
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
    
    let response;
    let err;
    
    xhr.onload = () => {
        response = xhr.response; 
        console.log(response);
        options.callback(null, response);       
    }
    
    xhr.onerror = (e) => {
        err = new Error;
        options.callback(err, null);
    } 

    xhr.send(formData);
} 