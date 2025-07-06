/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json'; 
    const formData = new FormData();    
    let url = options.url;
    if(options.method != 'GET') {   
        for(let key in options.data) {
            formData.append( key, options.data.key );
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
    
    xhr.onload = () => {
        options.callback(null, xhr.response);       
    }
    
    xhr.onerror = (e) => {
        options.callback(new Error(), null);
    } 

    xhr.send(formData);
} 