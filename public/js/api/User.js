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
    localStorage.setItem( user, JSON.stringify( user ) );    
  }
  
 

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent( user ) {
    localStorage.removeItem( user );
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current( user ) {
    JSON.parse(localStorage.getItem( user ));
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
        if(response.success && !this.current()) {          
          callback = (err, response) => {         
          this.setCurrent(response.user);
          }
        }
        if(!response.success && this.current()) {           
          callback = (err,response) => {
            this.unsetCurrent(response.user);              
          }
          throw Error('Необходима авторизация');
        } 
        if (err) {
          throw Error('Ошибка запроса');
        }    
      }
    })
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
        console.log(response);     
        if (response.success) {
          this.setCurrent( response.user );
          callback (err, response);
        } 
        if (err) {          
          throw Error('Ошибка запроса');
        }        
      }
    })
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
        console.log(response);
        if (response.user) {
          this.setCurrent( response.user );
          callback(err, response);
        }
        if (err) {
          throw Error('Ошибка запроса');
        }        
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
        if (response.success) {
          App.setState('init');
          User.unsetCurrent( response.user );
          callback(err, response);
        }
        if (err) {
          throw Error('Ошибка запроса');
        }        
      }                
    })
  }
}