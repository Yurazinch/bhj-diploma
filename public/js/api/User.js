/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent( user ) {    
    localStorage.setItem( user.email, JSON.stringify( response.user ) );    
  }
  
 

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem();
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    JSON.parse(localStorage.getItem(response.user.email));
  }

  static URL = '/user';

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      responseType: 'json',
      callback: (err, response) => {
        if(response) { 
          if(response.user) {
          this.setCurrent(response.user);
          } else {
            this.unsetCurrent(response.user); 
            throw Error('Необходима авторизация');
          }
          callback(err, response);
        }                   
      }
    });
  }
  

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => { 
        if (response && response.user) {
          this.setCurrent( response.user );          
        } 
        callback(err, response);        
      }
    });
  }  

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'GET',
      responseType: 'json',
      data,    
      callback: (err, response) => {        
        if (response && response.user) {
          this.setCurrent( response.user );          
        }
        callback(err, response);        
      }                 
    })
  } 

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.unsetCurrent( response.user );          
        }
        callback(err, response);        
      }                
    })
  }
}