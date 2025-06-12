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

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(cbResp) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      responseType: 'json',
      data,
      cbResp: (err, response) => {
        let user = response.user;
        if (user === false) {          
          User.unsetCurrent(user);
          throw Error('Необходима авторизация');                
        } 
        if (user === true) {
          User.setCurrent(user);
        } else {
          statusText = err;
          throw Error("statusText");
        }
      }
    })
  }

  static URL = '/user';

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, cbResp) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      cbResp: (err, response) => {        
        if (response.user) {
          user = response.user
          this.setCurrent( user );
        } else {
          statusText = err;
          throw Error("statusText");
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
  static register(data, cbResp) {
    createRequest({
      url: this.URL + '/register',
      method: 'GET',
      responseType: 'json',
      data,    
      cbResp: (err, response) => {
        if (response.user) {
          user = response.user
          this.setCurrent( user );
        } else {
          statusText = err;
          throw Error("statusText");
        }
      }                 
    })
  } 

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(cbResp) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data,
      cbResp: (err, response) => {
        if (response.success) {
          App.setState('init');
          user = response.user;
          User.unsetCurrent( user );
        }else {
          statusText = err;
          throw Error("statusText");
        }
      }                
    })
  }
}